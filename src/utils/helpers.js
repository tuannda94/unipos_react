import commons from 'Utils/commons';
import axios from 'axios';

// const routeMap = {
//     'profile': 'app/Http/Controllers/Unipos/ProfileController@profile',
//     'received': 'app/Http/Controllers/Unipos/ProfileController@profile',
//     'sent': 'app/Http/Controllers/Unipos/ProfileController@profile',
//     'clapped': 'app/Http/Controllers/Unipos/ProfileController@profile',
// }

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

// export function dispatch() {
//     let currentRoute = window.location.href.replace(commons.BASE_URL, '').split("?")[0];
//     let routeMatching = {};
//     for (let key in routeMap) {
//         if (currentRoute == key) {
//             let route = routeMap[key].split("@");
//             routeMatching = {
//                 'controller': route[0],
//                 'action': route[1]
//             };
//         }
//     }

//     return routeMatching;
// }

export default {
    makeRequest,
    // dispatch
}
