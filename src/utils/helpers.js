import commons from 'Utils/commons';
import axios from 'axios';

export function makeRequest(data, token, unipos = false, method = 'POST') {
    return axios({
        "url": commons.API_URL,
        "method": method,
        "headers": {
            "Content-Type": "application/json",
            "x-unipos-token": token,
        },
        data: JSON.stringify(data),
    }).then(response => response.data.result)
    .catch(error => error);
}

export default {
    makeRequest
}

export function getJSONP(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0]
               || document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);

}
