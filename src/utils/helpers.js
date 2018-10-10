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
