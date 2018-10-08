import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

//Unipos
window.$ = window.jQuery = require('jquery');
window.axios = require('axios');

import css from 'sourceDir/css/app.css';
import env from 'codebaseDir/env.js';
import * as controllers from 'codebaseDir/app/Http/Controllers/ControllerResolver.js';

let html = require('codebaseDir/views/cw/main.html');

chrome.runtime.onMessage.addListener((params) => {
    if (params.message === 'onPageLoad') {
        if (window.location.href.indexOf(env.BASE_URL) != -1) {
            // Unipos
            let urlParams = window.location.href.replace(env.BASE_URL, '').split("?")[1];
            if (urlParams !== null && urlParams !== undefined) {
                let currentUserId = urlParams.split("=")[1];
                let route = controllers.default.routeMatchingController.dispatch();
                if (!$.isEmptyObject(route)) {
                    if ($('.unipos-wrapper').length) {
                        $('.unipos-wrapper').css("display", "none");
                    }
                    let action = route.action;
                    let controller = route.controller.substring(route.controller.lastIndexOf('/') + 1);
                    controller = controller.charAt(0).toLowerCase() + controller.slice(1);
                    controllers.default[controller][action]();
                }
            }
        }
    } else if (params.message === 'onCWPageLoad') {
        if (window.location.href.indexOf(env.CW_URL) != -1) {
            // Chatwork
            setTimeout(() => {
                let uniposIcon = "<li><img id=\"unipos-icon\" class=\"unipos-icon\" src=\"https://unipos.me/img/favicon.ico\"/></li>";
                if ($("#unipos-icon").length === 0) {
                    $("#_chatSendTool").append(uniposIcon);
                }
                $("#_wrapper").append(html);
                controllers.default["cwPostController"]["eventBinding"]();
            }, 3000);
        }
    }
});

chrome.runtime.sendMessage({ message: "onPageLoad" });
