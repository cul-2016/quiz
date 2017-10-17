import { hashHistory } from 'react-router';
import { store } from '../store';
import { logout as logoutAction } from '../actions/login';
import axios from 'axios';
/**
* Logs the user out
*/
export default function logout () {

  axios.post('/logout')
    .then(() => {
      clearBrowser(() => {
          store.dispatch(logoutAction());
      });
    })
    .catch((error) => {
      console.log(error);
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
