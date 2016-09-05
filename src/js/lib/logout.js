import { hashHistory } from 'react-router';
import { store } from '../store';
import { logout as logoutAction } from '../actions/login';

/**
* Logs the user out
*/
export default function logout () {

    clearBrowser(() => {

        store.dispatch(logoutAction());
        hashHistory.push('/');
    });
}

/**
* Deletes app cookies and local storage
* @param {function} callback - callback function
*/
function clearBrowser (callback) {

    document.cookie = "cul_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "cul_is_lecturer=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "cookie_message=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    localStorage.removeItem("state");
    callback();
}
