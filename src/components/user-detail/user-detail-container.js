import env from 'codebaseDir/env.js';
import { unipos } from 'codebaseDir/config/unipos.js';
let html = require('codebaseDir/views/app.html');

class ProfileController
{
    constructor(data) {
        this.maxRequestResult = unipos.max_request_result;
        this.requestHandler = data.uniposProfileRequestHandler;
        this.receivedCards = [];
        this.sentCards = [];
        this.clappedCards = [];
        this.totalReceivedPoint = 0;
        this.totalSentPoint = 0;
        this.totalClappedPoint = 0;
        this.userProfile = {};
        this.template = html;
    }

    async profile() {
        await this.clearData();
        let allLoaded = false;
        while (!allLoaded) {
            let requests = [];
            if ($.isEmptyObject(this.userProfile)) {
                requests.push(this.requestHandler.profile());
            }

            if (this.firstLoad() || (this.receivedCards.length != 0 && this.receivedCards.length % this.maxRequestResult == 0)) {
                let lastCard = this.receivedCards[this.receivedCards.length - 1];
                let offset = lastCard != undefined ? lastCard.id : '';
                requests.push(this.requestHandler.received(offset));
            }

            if (this.firstLoad() || (this.sentCards.length != 0 && this.sentCards.length % this.maxRequestResult == 0)) {
                let lastCard = this.sentCards[this.sentCards.length - 1];
                let offset = lastCard != undefined ? lastCard.id : '';
                requests.push(this.requestHandler.sent(offset));
            }

            if (this.firstLoad() || (this.clappedCards.length != 0 && this.clappedCards.length % this.maxRequestResult == 0)) {
                let lastCard = this.clappedCards[this.clappedCards.length - 1];
                let offset = lastCard != undefined ? lastCard.id : '';
                requests.push(this.requestHandler.clapped(offset));
            }

            if (requests.length == 0) {
                allLoaded = true;
                break;
            }

            await Promise.all(requests).then(value => {
                $.each(value, (key, value) => {
                    if (value.member != undefined) {
                        this.userProfile = value;
                    } else if (value.length > 0 && value[0].from_member.id == this.userProfile.member.id) {
                        $.merge(this.sentCards, value);
                    } else if (value.length > 0 && value[0].to_member.id == this.userProfile.member.id) {
                        $.merge(this.receivedCards, value);
                    } else if (value.length > 0 && value[0].to_member.id != this.userProfile.member.id && value[0].from_member.id != this.userProfile.member.id) {
                        $.merge(this.clappedCards, value);
                    }
                });
            });
        }

        if (allLoaded) {
            let totalReceivedPoint = 0;
            let totalSentPoint = 0;
            let totalClappedPoint = 0;

            $.each(this.receivedCards, (key, value) => {
                totalReceivedPoint += (value.point + value.praise_count);
            });

            $.each(this.sentCards, (key, value) => {
                totalReceivedPoint += value.praise_count;
                totalSentPoint += value.point;
            });

            totalClappedPoint = this.clappedCards.length;

            this.totalReceivedPoint = totalReceivedPoint;
            this.totalSentPoint = totalSentPoint;
            this.totalClappedPoint = totalClappedPoint;
            await this.display();
        }
    }

    firstLoad()
    {
        return this.receivedCards.length == 0 &&
                this.sentCards.length == 0 &&
                this.clappedCards.length == 0 &&
                $.isEmptyObject(this.userProfile)
    }

    display() {
        let groups = this.userProfile.groups[0] || '';
        let template = this.template;

        template = template.replace("{user_avatar}", this.userProfile.member.picture_url);
        template = template.replace("{userName}", this.userProfile.member.display_name);
        template = template.replace("{email}", this.userProfile.member.email_address);
        template = template.replace("{groupName}", groups.name != undefined ? groups.name : '');
        template = template.replace("{totalReceivedPoint}", this.totalReceivedPoint);
        template = template.replace("{totalSentPoint}", this.totalSentPoint);
        template = template.replace("{totalClappedPoint}", this.totalClappedPoint);

        let itv = setInterval(() => {
            if ($('.unipos-wrapper').length) {
                $('.unipos-wrapper').remove();
            }
            if ($('#js_body').length) {
                if ($('#js_body').length) {
                    $('#js_body').append(template);
                    clearInterval(itv);
                }
            }
        }, 500);
    }

    clearData() {
        this.receivedCards = [];
        this.sentCards = [];
        this.clappedCards = [];
        this.totalReceivedPoint = 0;
        this.totalSentPoint = 0;
        this.totalClappedPoint = 0;
        this.userProfile = {};
        this.template = html;
    }
}

export { ProfileController };
