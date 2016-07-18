import validCookieExists from './validCookieExists';
import getUserEmail from './getUserEmail';
import { store } from '../store';
import { setUserDetails } from '../actions/user';



const userHasSignedIn = (nextState, replace, callback) => {
    if (!validCookieExists()) {
        replace('/');
    } else {
        const email = getUserEmail();
        var userState = store.getState().user;
        if (!userState) {
            // there is a cookie but no user state then fetch user state
            store.dispatch(setUserDetails(email));
        } else {
            // there is a cookie and a user state then take user to correct dashboard
            if (userState.is_lecturer) {
                replace('/dashboard-lecturer');
            } else {
                replace('/dashboard-student');
            }
        }
    }
    callback();
};

export default userHasSignedIn;
