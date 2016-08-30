import { store } from '../store';
import validCookieExists from './validCookieExists';
import { getModule, getModuleMembers, clearModuleState } from '../actions/module';
import { getDashboard } from '../actions/dashboard';
import { loadUserState } from './userState';
import { getUserDetails } from '../actions/user';
import { getQuizReview } from '../actions/review';
import { getQuizResult } from '../actions/result';
import { getQuizMembers } from '../actions/quiz-members';
import { getQuizDetails } from '../actions/new-quiz';
import { getLeaderboard } from '../actions/leaderboard';
import getUserID from './getUserID';
import isUserLecturer from './isUserLecturer';
import { socketClient } from '../socket';

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
 * Checks if user is authenticated and a lecturer.  Redirects  to '/' if they're not
 * Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function authenticateLecturer (nextState, replace, callback) {
    console.log(typeof isUserLecturer(), '<<<<<<<<<<<<<<<<<<<<<<<<<');
    if (!validCookieExists() || isUserLecturer() === false) {
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

    // get user's role
    let module_id = nextState.params.module_id;
    let is_lecturer = store.getState().user.is_lecturer;
    let user_id = store.getState().user.user_id;

    if (validCookieExists()) {
        store.dispatch(getModule(module_id, is_lecturer, user_id));
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
export function fetchQuizReview (nextState, replace, callback) {

    if (validCookieExists()) {
        const quiz_id = nextState.params.quiz_id;
        store.dispatch(getQuizReview(quiz_id));
    }
    callback();
}

/**
 * Fetches members that belong to a given module_id.  Is used as an onEnter hook for React Router
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
 * Fetches members that have completed a given quiz.  Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function fetchResult (nextState, replace, callback) {

    if (validCookieExists()) {
        const user_id = store.getState().user.user_id;
        const module_id = nextState.params.module_id;
        const quiz_id = nextState.params.quiz_id;
        store.dispatch(getQuizResult(user_id, module_id, quiz_id));
    }
    callback();
}

/**
 * Fetches a student's quiz results  Is used as an onEnter hook for React Router
 * Fetches members that have completed a given quiz.  Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */

export function fetchQuizMembers (nextState, replace, callback) {

    if (validCookieExists()) {
        const quiz_id = nextState.params.quiz_id;
        store.dispatch(getQuizMembers(quiz_id));
    }
    callback();
}


/**
 * Fetches all the questions for a given quiz_id.  Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */

export function fetchQuizDetails (nextState, replace, callback) {

    if (validCookieExists()) {

        const quiz_id = nextState.params.quiz_id;
        store.dispatch(getQuizDetails(quiz_id));
    }
    callback();
}


/**
 * Fetches the leaderboard for a given module_id.  Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */

export function fetchLeaderboard (nextState, replace, callback) {

    if (validCookieExists()) {

        const module_id = nextState.params.module_id;
        store.dispatch(getLeaderboard(module_id));
    }
    callback();
}

/**
 * leaves all the socket rooms the user is part of.  Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */

export function leaveRoom (nextState, replace, callback) {

    if (validCookieExists()) {
        socketClient.emit('leave_room', (msg) => {
            console.log(msg);
        });
    }
    callback();
}

/**
 * clear the module state when entering dashboard.  Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */

export function resetModuleState (nextState, replace, callback) {

    if (validCookieExists()) {
        store.dispatch(clearModuleState());
    }
    callback();
}
