import { store } from '../store';
import { socketClient } from '../socket';
import { hashHistory } from 'react-router';
import validCookieExists from './validCookieExists';
import { getModule, getModuleMembers } from '../actions/module';
import { getDashboard } from '../actions/dashboard';
import { getUserDetails } from '../actions/user';
import { getQuizReview } from '../actions/review';
import { getQuizResult } from '../actions/result';
import { getQuizMembers } from '../actions/quiz-members';
import { getQuizDetails } from '../actions/new-quiz';
import { getQuizDetailsStudent } from '../actions/review';
import { getLeaderboard } from '../actions/leaderboard';
import { getFeedback } from '../actions/feedback';
import { getStudentHistory } from '../actions/student-history';
import { clearInitialState } from '../actions/login';
import { getSuperAdminDashboard } from '../actions/super-admin';
import { getGroupAdminDashboard } from '../actions/group-admin';
import { createMoodleModule } from '../actions/new-module';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-113135812-1');

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
        callback(false);
    } else if (!store.getState().user.user_id) {

        localStorage.setItem('previousPath', nextState.location.pathname);
        replace('/app-loading');
        callback(false);
    } else {
        ReactGA.pageview(nextState.location.pathname);
        callback();
    }
}

/**
 * Checks if user is a lecturer.  Redirects  to '/' if they're not
 * Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function checkUserRole (nextState, replace, callback) {

    if (store.getState().user.is_lecturer === false) {
        replace('/dashboard');
        callback(false);
    } else {
        callback();
    }
}


/**
 * Checks if module_owner is the same as user_id.  Redirects  to '/404' if they're not
 * Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function checkModuleOwner (nextState, replace, callback) {
    const state = store.getState();
    const lecturerOwnsModule = state.module.owner === state.user.user_id;

    if (!lecturerOwnsModule) {
        replace('/404');
        callback(false);
    } else {
        callback();
    }
}

/**
 * fetches user details.  Redirects  to '/' if they're not authorised
 * Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function fetchUserDetails (nextState, replace, callback) {

    if (!validCookieExists()) {
        replace('/');
    } else {
        store.dispatch(getUserDetails());
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

    store.dispatch(getModule(module_id, is_lecturer))
      .then(() => {
        if (is_lecturer === false) {
          if (nextState.location.pathname.includes('performance')) {
            store.dispatch(getFeedback(module_id));
          } else {
            store.dispatch(getStudentHistory(undefined, module_id));
          }
        }
        callback();
      }).catch((err) => {
        if (is_lecturer) {
          store.dispatch(createMoodleModule(module_id));
          hashHistory.push('/add-new-module');
          callback();
        }
      });
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
        const isSurvey = store.getState().liveQuiz.isSurvey;
        const quiz_id = nextState.params.quiz_id;
        store.dispatch(getQuizReview(quiz_id, isSurvey));
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
        const isSurvey = store.getState().liveQuiz.isSurvey;
        const id = nextState.params.quiz_id;
        store.dispatch(getQuizMembers(id, isSurvey));
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
        const survey_id = nextState.params.survey_id;
        store.dispatch(getQuizDetails(quiz_id, survey_id));
    }
    callback();
}

export function fetchQuizDetailsStudent (nextState, replace, callback) {

    if (validCookieExists()) {
        const quiz_id = nextState.params.quiz_id;

        store.dispatch(getQuizDetailsStudent(quiz_id));
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
    const module_id = nextState.params.module_id;
    store.dispatch(getLeaderboard(module_id));

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
        socketClient.emit('leave_room', () => {});
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

export function clearState (nextState, replace, callback) {

    store.dispatch(clearInitialState());
    callback();
}

/**
 * fetches all users for super admin.  Redirects  to '/' if they're not authorised
 * Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function fetchSuperAdminDashboard (nextState, replace, callback) {

    if (!validCookieExists()) {
        replace('/');
    } else {
        store.dispatch(getSuperAdminDashboard());
    }
    callback();
}

/**
 * fetches all users that belong to a group admin.  Redirects  to '/' if they're not authorised
 * Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function fetchGroupAdminDashboard (nextState, replace, callback) {

    if (!validCookieExists()) {
        replace('/');
    } else {
        store.dispatch(getGroupAdminDashboard());
    }
    callback();
}
