import commons from 'Utils/commons';

let url = '';
let userId = '';

chrome.tabs.onUpdated.addListener(function () {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        if (url !== tabs[0].url) {
            url = tabs[0].url;
            let matches = url.match(commons.BASE_URL_MATCH_QUERY);
            if (matches && matches[1] && matches[1] !== userId) {
                userId = matches[1];
                chrome.tabs.sendMessage(tabs[0].id, { message: "onPageLoad", id: matches[1]});
            }
        }
    });
})

chrome.runtime.onMessage.addListener(function (params) {
    if (params.message === 'onPageLoad') {
        chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
            url = tabs[0].url;
            let matches = url.match(commons.BASE_URL_MATCH_QUERY);
            if (matches !== null && matches[1]) {
                userId = matches[1];
                chrome.tabs.sendMessage(tabs[0].id, { message: "onPageLoad", id: matches[1] });
            }
        })
    }
});
