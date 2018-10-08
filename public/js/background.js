/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _commons = __webpack_require__(7);

var _commons2 = _interopRequireDefault(_commons);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var url = '';
var userId = '';

chrome.tabs.onUpdated.addListener(function () {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        if (url !== tabs[0].url) {
            url = tabs[0].url;
            var matches = url.match(_commons2.default.BASE_URL_MATCH_QUERY);
            if (matches && matches[1] && matches[1] !== userId) {
                userId = matches[1];
                chrome.tabs.sendMessage(tabs[0].id, { message: "onPageLoad", id: matches[1] });
            } else if (url.match(_commons2.default.CW_URL_MATCH_QUERY)) {
                matches = url.match(_commons2.default.CW_URL_MATCH_QUERY);
                console.log(matches);
                chrome.tabs.sendMessage(tabs[0].id, { message: "onCWPageLoad", id: matches });
            }
        }
    });
});

chrome.runtime.onMessage.addListener(function (params) {
    if (params.message === 'onPageLoad') {
        chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
            url = tabs[0].url;
            var matches = url.match(_commons2.default.BASE_URL_MATCH_QUERY);
            if (matches !== null && matches[1]) {
                userId = matches[1];
                chrome.tabs.sendMessage(tabs[0].id, { message: "onPageLoad", id: matches[1] });
            } else if (url.match(_commons2.default.CW_URL_MATCH_QUERY)) {
                matches = url.match(_commons2.default.CW_URL_MATCH_QUERY);
                console.log(matches);
                chrome.tabs.sendMessage(tabs[0].id, { message: "onCWPageLoad", id: matches });
            }
        });
    }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var commons = {
    BASE_URL: "https://unipos.me/",
    API_URL: "https://unipos.me/q/jsonrpc",
    CW_URL: "https://www.chatwork.com",
    BASE_URL_MATCH_QUERY: /https:\/\/unipos.me\/.*?i=(.*)/,
    CW_URL_MATCH_QUERY: /https:\/\/www.chatwork.com\/.*/
};

exports.default = commons;

/***/ })
/******/ ]);