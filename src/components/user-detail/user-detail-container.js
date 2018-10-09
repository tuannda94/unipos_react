import React from 'react'
import UserDetail from './user-detail';
import commons from 'Utils/commons';
import api from 'Services/api';

class UserDetailContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            receivedCards: [],
            sentCards: [],
            clappedCards: [],
            totalReceivedPoint: 0,
            totalSentPoint: 0,
            totalClappedPoint: 0,
            userProfile: [],
            allLoaded: false
        };
    }

    componentDidMount() {
        this.profile();
    }

    componentWillReceiveProps(nextProps) {
        this.profile();
    }

    async profile() {
        await this.clearData();
        let {receivedCards, sentCards, clappedCards, userProfile, allLoaded} = this.state;

        while (!allLoaded) {
            let requests = [];
            if (!Object.keys(userProfile).length) {
                requests.push(api.profile());
            }

            if (this.firstLoad() || (receivedCards.length != 0 && receivedCards.length % commons.MAX_REQUEST_RESULT == 0)) {
                let lastCard = receivedCards[receivedCards.length - 1];
                let offset = lastCard != undefined ? lastCard.id : '';
                requests.push(api.received(offset));
            }

            if (this.firstLoad() || (sentCards.length != 0 && sentCards.length % commons.MAX_REQUEST_RESULT == 0)) {
                let lastCard = sentCards[sentCards.length - 1];
                let offset = lastCard != undefined ? lastCard.id : '';
                requests.push(api.sent(offset));
            }

            if (this.firstLoad() || (clappedCards.length != 0 && clappedCards.length % commons.MAX_REQUEST_RESULT == 0)) {
                let lastCard = clappedCards[clappedCards.length - 1];
                let offset = lastCard != undefined ? lastCard.id : '';
                requests.push(api.clapped(offset));
            }

            try {
                const values = await Promise.all(requests);
                values.map((value) => {
                    if (value && value.member != undefined) {
                        userProfile = value;
                        this.setState({ userProfile });
                    } else if (value.length > 0 && value[0].from_member.id == userProfile.member.id) {
                        this.setState({ sentCards: sentCards.concat(value) });
                    } else if (value.length > 0 && value[0].to_member.id == userProfile.member.id) {
                        this.setState({ receivedCards: receivedCards.concat(value) });
                    } else if (value.length > 0 && value[0].to_member.id != userProfile.member.id && value[0].from_member.id != userProfile.member.id) {
                        this.setState({ clappedCards: clappedCards.concat(value) });
                    }
                });

            } catch (error) {
                console.log('Error: --- ', error);
            }

            if (requests.length == 0) {
                this.setState({ allLoaded: true }, () => {
                    let totalReceivedPoint = 0;
                    let totalSentPoint = 0;
                    let totalClappedPoint = 0;

                    this.state.receivedCards.map((value) => {
                        totalReceivedPoint += (value.point + value.praise_count);
                    });

                    this.state.sentCards.map((value) => {
                        totalReceivedPoint += value.praise_count;
                        totalSentPoint += value.point;
                    });

                    totalClappedPoint = this.state.clappedCards.length;

                    this.setState({ totalReceivedPoint, totalSentPoint, totalClappedPoint, allLoaded: false });
                });
                break;
            }
        }

    }

    firstLoad() {
        const {receivedCards, sentCards, clappedCards, userProfile} = this.state;

        return receivedCards.length == 0 &&
                sentCards.length == 0 &&
                clappedCards.length == 0 &&
                !Object.keys(userProfile).length
    }

    // display() {
    //     let groups = this.userProfile.groups[0] || '';
    //     let template = this.template;

    //     template = template.replace("{user_avatar}", this.userProfile.member.picture_url);
    //     template = template.replace("{userName}", this.userProfile.member.display_name);
    //     template = template.replace("{email}", this.userProfile.member.email_address);
    //     template = template.replace("{groupName}", groups.name != undefined ? groups.name : '');
    //     template = template.replace("{totalReceivedPoint}", this.totalReceivedPoint);
    //     template = template.replace("{totalSentPoint}", this.totalSentPoint);
    //     template = template.replace("{totalClappedPoint}", this.totalClappedPoint);

    //     let itv = setInterval(() => {
    //         if ($('.unipos-wrapper').length) {
    //             $('.unipos-wrapper').remove();
    //         }
    //         if ($('#js_body').length) {
    //             if ($('#js_body').length) {
    //                 $('#js_body').append(template);
    //                 clearInterval(itv);
    //             }
    //         }
    //     }, 500);
    // }

    clearData() {
        this.setState({
            receivedCards: [],
            sentCards: [],
            clappedCards: [],
            totalReceivedPoint: 0,
            totalSentPoint: 0,
            totalClappedPoint: 0,
            userProfile: {}
        });
    }

    render() {
        console.log(this.state);
        const {userProfile} = this.state;

        return (
            Object.keys(userProfile).length &&
            <UserDetail {...this.state} />
        );
    }
}

export default UserDetailContainer;
