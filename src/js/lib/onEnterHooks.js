import { store } from '../store';
import { getModule } from '../actions/module';
import { getUserDetails } from '../actions/user';
import validCookieExists from './validCookieExists';
import getUserID from './getUserID';


/**
 * Checks if user is authenticated.  Redirects if they're not
 * Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function authenticate (nextState, replace, callback) {

    if (!validCookieExists()) {
        replace('/');
    }
    callback();
}


/**
 * Checks if user is has signed in.  Redirects if they're not
 * Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function userHasSignedIn (nextState, replace, callback) {

    if (validCookieExists()) {
        replace('/auth');
    }
    callback();
}


/**
 * Dispatches an action to get user details
 * Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function fetchUserDetails (nextState, replace, callback) {

    const user_id = getUserID();

    store.dispatch(getUserDetails(user_id));
    callback();
}


/**
 * Fetches module information.  Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function fetchModule (nextState, replace, callback) {
    console.log(nextState.params, '<<<<<<<<<');
    store.dispatch(getModule(nextState.params.module_id));
    callback();
}
