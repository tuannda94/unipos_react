import React from 'react';
import ReactDOM from 'react-dom';
import UserDetail from 'Components/user-detail/';
import registerServiceWorker from './registerServiceWorker';
import commons from 'Utils/commons';

function run(id) {
    ReactDOM.render(<UserDetail id={id} />, document.getElementById('user_detail_wrapper'));
    registerServiceWorker();
}

let user_detail_wrapper = document.createElement('div');
user_detail_wrapper.setAttribute('id', 'user_detail_wrapper');
document.getElementById('content').appendChild(user_detail_wrapper);

chrome.runtime.onMessage.addListener((params) => {
    if (params.message === 'onPageLoad') {
        if (window.location.href.indexOf(commons.BASE_URL) != -1) {
            let urlParams = window.location.href.replace(commons.BASE_URL, '');
            if (urlParams != 'member_not_found' && urlParams != null && urlParams != undefined) {
                const loadedStates = ['complete', 'loaded', 'interactive'];
                if (loadedStates.includes(document.readyState) && document.body) {
                    run(params.id);
                } else {
                    window.addEventListener('DOMContentLoaded', run, false);
                }
            }
        }
    }
});

chrome.runtime.sendMessage({ message: 'onPageLoad' });
