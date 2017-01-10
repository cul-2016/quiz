import { hashHistory } from 'react-router';
import { store } from '../store';
import { logout as logoutAction } from '../actions/login';
import axios from 'axios';
/**
* Logs the user out
*/
export default function logout () {

    clearBrowser(() => {

        store.dispatch(logoutAction());
        // removing user token from redis cache
        axios.post('/logout')
        .catch((error) => {
            console.log(error);
        });
        hashHistory.push('/');
    });
}

/**
* Deletes app cookies and local storage
* @param {function} callback - callback function
*/
function clearBrowser (callback) {

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "cul_is_cookie_accepted=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    localStorage.removeItem("state");
    callback();
}
