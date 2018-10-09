import commons from 'Utils/commons';
import {makeRequest} from 'Utils/helpers';

export async function received(offset = "") {
    let params = window.location.href.replace(commons.BASE_URL, '').split('?');
    let token = localStorage.getItem('authnToken');
    let memberId = params[1].substring(params[1].indexOf("=") + 1);
    let data = getRequestData(memberId, "received", offset);

    return await makeRequest(data, token, true);
}

export async function sent(offset = "") {
    let params = window.location.href.replace(commons.BASE_URL, '').split('?');
    let token = localStorage.getItem('authnToken');
    let memberId = params[1].substring(params[1].indexOf("=") + 1);
    let data = getRequestData(memberId, "sent", offset);

    return await makeRequest(data, token, true);
}

export async function clapped(offset = "") {
    let params = window.location.href.replace(commons.BASE_URL, '').split('?');
    let token = localStorage.getItem('authnToken');
    let memberId = params[1].substring(params[1].indexOf("=") + 1);
    let data = getRequestData(memberId, "clapped", offset);

    return await makeRequest(data, token, true);
}

export async function profile() {
    let params = window.location.href.replace(commons.BASE_URL, '').split('?');
    let token = localStorage.getItem('authnToken');
    let memberId = params[1].substring(params[1].indexOf("=") + 1);
    let data = getRequestData(memberId, "profile", "", "GetMemberDetail");

    return await makeRequest(data, token, true);
}

export async function suggestion(term, limit = 100) {
    let params = window.location.href.replace(commons.BASE_URL, '').split('?');
    let token = localStorage.getItem('authnToken');
    let memberId = params[1].substring(params[1].indexOf("=") + 1);
    let data = getRequestData(memberId, "suggestion", "", "FindSuggestMembers");

    return await makeRequest(data, token, true);
}

function getRequestData(memberId, type = "received", offset = "", method = "GetCards2") {
    let params = {
        "offset_card_id": offset,
        "count": commons.MAX_REQUEST_RESULT,
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

export default {
    received,
    sent,
    clapped,
    profile,
    suggestion
};
