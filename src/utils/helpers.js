import React from 'react';

export function makeRequest(data, token, unipos = false, method = 'POST') {
    return new Promise((resolve, reject) => {
        axios({
            "url": this.apiUrl,
            "method": method,
            "headers": {
                "Content-Type": "application/json",
                "x-unipos-token": token,
            },
            data: JSON.stringify(data),
        }).then(response => {
            resolve(response.data.result);
        }).catch(error => {
            reject(error)
        });
    });
}

export function dispatch() {
    let currentRoute = window.location.href.replace(this.baseUrl, '').split("?")[0];
    let routeMatching = {};
    for (let key in this.routes) {
        if (currentRoute == key) {
            let route = this.routes[key].split("@");
            routeMatching = {
                'controller': route[0],
                'action': route[1]
            };
        }
    }

    return routeMatching;
}
