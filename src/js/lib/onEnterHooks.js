import { store } from '../store';
import validCookieExists from './validCookieExists';
import { getModule, getModuleMembers } from '../actions/module';
import { getDashboard } from '../actions/dashboard';
import { loadUserState } from './userState';
import { getUserDetails } from '../actions/user';
import { getQuizReview } from '../actions/review';
import { getQuizScore } from '../actions/score';
import getUserID from './getUserID';


/**
 * Checks if user is authenticated.  Redirects  to '/' if they're not
 * Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function authenticate (nextState, replace, callback) {
    if (!validCookieExists()) {
        replace('/');
    } else if (!loadUserState() && !store.getState().user.user_id) {
        store.dispatch(getUserDetails(getUserID()));
    }
    callback();
}

/**
 * Checks if user is authenticated in the indexRoute.  Redirects to dashboard if they are.
 * Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function shouldUserRedirect (nextState, replace, callback) {

    if (validCookieExists()) {
        replace('/dashboard');
    }
    callback();
}

/**
 * Fetches module information for the selected module.  Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function fetchModule (nextState, replace, callback) {

    if (validCookieExists()) {
        store.dispatch(getModule(nextState.params.module_id));
    }
    callback();
}

/**
 * Fetches module List when user enters the dashboard.  Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function fetchModuleList (nextState, replace, callback) {
    if (validCookieExists()) {
        store.dispatch(getDashboard());
    }
    callback();
}

/**
 * Fetches quiz review List when lecturer enters the review endpoint for a given quiz.  Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function fetchquizReview (nextState, replace, callback) {
    if (validCookieExists()) {
        const quiz_id = nextState.params.quiz_id;
        store.dispatch(getQuizReview(quiz_id));
    }
    callback();
}

/**
 * Fetches users that belong to a given module_id.  Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */

export function fetchModuleMembers (nextState, replace, callback) {
    if (validCookieExists()) {
        const module_id = nextState.params.module_id;
        store.dispatch(getModuleMembers(module_id));
    }
    callback();
}

/**
 * Fetches a student's quiz score  Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function fetchScore (nextState, replace, callback) {

    if (validCookieExists()) {

        const user_id = store.getState().user.user_id;
        const quiz_id = nextState.params.quiz_id;
        store.dispatch(getQuizScore(user_id, quiz_id));
    }
    callback();
}
