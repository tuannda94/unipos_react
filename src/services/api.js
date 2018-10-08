import React from 'react';
import commons from 'Utils/commons';
import makeRequest from 'Utils/helpers';

class Api extends React.Component {
    constructor(props) {
        super();
        this.baseUrl = commons.BASE_URL;
        this.apiUrl = commons.API_URL;
        this.maxRequestResult = commons.MAX_REQUEST_RESULT;
    }

    async received(offset = "") {
        let params = window.location.href.replace(this.baseUrl, '').split('?');
        let token = localStorage.getItem('authnToken');
        let memberId = params[1].substring(params[1].indexOf("=") + 1);
        let data = this.getRequestData(memberId, "received", offset);

        return await makeRequest(data, token, true);
    }

    async sent(offset = "") {
        let params = window.location.href.replace(this.baseUrl, '').split('?');
        let token = localStorage.getItem('authnToken');
        let memberId = params[1].substring(params[1].indexOf("=") + 1);
        let data = this.getRequestData(memberId, "sent", offset);

        return await makeRequest(data, token, true);
    }

    async clapped(offset = "") {
        let params = window.location.href.replace(this.baseUrl, '').split('?');
        let token = localStorage.getItem('authnToken');
        let memberId = params[1].substring(params[1].indexOf("=") + 1);
        let data = this.getRequestData(memberId, "clapped", offset);

        return await makeRequest(data, token, true);
    }

    async profile() {
        let params = window.location.href.replace(this.baseUrl, '').split('?');
        let token = localStorage.getItem('authnToken');
        let memberId = params[1].substring(params[1].indexOf("=") + 1);
        let data = this.getRequestData(memberId, "profile", "", "GetMemberDetail");

        return await makeRequest(data, token, true);
    }

    async suggestion(term, limit = 100) {
        let params = window.location.href.replace(this.baseUrl, '').split('?');
        let token = localStorage.getItem('authnToken');
        let memberId = params[1].substring(params[1].indexOf("=") + 1);
        let data = this.getRequestData(memberId, "suggestion", "", "FindSuggestMembers");

        return await makeRequest(data, token, true);
    }

    getRequestData(memberId, type = "received", offset = "", method = "GetCards2") {
        let params = {
            "offset_card_id": offset,
            "count": this.maxRequestResult,
        };
        switch(type) {
            case "received":
                params.to_member_id = memberId;
                break;
            case "sent":
                params.from_member_id = memberId;
                break;
            case "clapped":
                params.praised_member_id = memberId;
                break;
            case "profile":
                params.member_id = memberId;
                delete params.offset_card_id;
                delete params.count;
                break;
            case "suggestion":
                params.limit = memberId;
                delete params.offset_card_id;
                delete params.count;
                break;
            default:
                //
        }

        return {
            "jsonrpc":"2.0",
            "method":"Unipos." + method,
            "params":params,
            "id":"Unipos." + method
        };
    }
}

export default Api;
