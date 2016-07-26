import { store } from '../store';

import { getModule } from '../actions/module';
import { getDashboard } from '../actions/dashboard';
import { getUserDetails } from '../actions/user';

import validCookieExists from './validCookieExists';
import getUserID from './getUserID';


export function authenticate (nextState, replace, callback) {
    
    if (!validCookieExists()) {
        replace('/');
    }
    callback();
}

/**
 * Fetches module information.  Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */

export function fetchModuleDetails (nextState, replace, callback) {

    store.dispatch(getModule(nextState.params.module_id));
    callback();
}


export function fetchModules (nextState, replace, callback) {

    store.dispatch(getDashboard());
    callback();
}


export function userHasSignedIn (nextState, replace, callback) {

    if (validCookieExists()) {
        replace('/auth');
    }
    callback();
}


export function fetchUserDetails (nextState, replace, callback) {

    const user_id = getUserID();

    store.dispatch(getUserDetails(user_id));
    callback();
}
