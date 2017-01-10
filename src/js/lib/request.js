import axios from 'axios';
import { logout } from '../actions/login.js';
import { hashHistory } from 'react-router';

const request = (method) => (dispatch) => (url, payload) => {
    return new Promise((resolve, reject) => {
        axios[method](url, payload)
        .then(resolve)
        .catch((err) => {
          /* istanbul ignore if */
            if (err.response.status === 401) {
                dispatch(logout());
                hashHistory.push('/');
            }

            reject(err);
        });
    });
};

export default {
    get: request('get'),
    post: request('post'),
    put: request('put'),
    del: request('del')
};

