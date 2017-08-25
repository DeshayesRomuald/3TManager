import { ajax } from 'rxjs/observable/dom/ajax';

const defaultConfig = { 
    method: 'GET', 
    crossDomain: true, 
    withCredentials: true, 
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'JWT '+window.localStorage.getItem('authorization')
    } 
};

export default (url, options) => (
    ajax(Object.assign({}, defaultConfig, { url }, options))
);