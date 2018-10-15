import commons from 'Utils/commons';

let url = '';
let userId = '';

chrome.tabs.onUpdated.addListener(function () {
    console.log('chrome on update');
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        console.log('chrome on update tabs', tabs);
        if (url !== tabs[0].url) {
            url = tabs[0].url;
            let matches = url.match(commons.BASE_URL_MATCH_QUERY);
            if (matches && matches[1] && matches[1] !== userId) {
                console.log('chrome on update vao unipos check userId', matches);

                userId = matches[1];
                chrome.tabs.sendMessage(tabs[0].id, { message: "onPageLoad", id: matches[1]});
            }
        }
    });
})

chrome.runtime.onMessage.addListener(function (params) {
    console.log('chrome on message', params);

    if (params.message === 'onPageLoad') {
        chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
            console.log('chrome on message tabs', tabs);
            url = tabs[0].url;
            let matches = url.match(commons.BASE_URL_MATCH_QUERY);
            if (matches !== null && matches[1]) {
                userId = matches[1];
                chrome.tabs.sendMessage(tabs[0].id, { message: "onPageLoad", id: matches[1] });
            }
        })
    }
});
