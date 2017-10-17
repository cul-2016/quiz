import { combineReducers } from 'redux';
import dashboard from './dashboard';
import newModule from './new-module';
import { joinModule } from './join-module';
import { user } from './user';
import { login } from './login';
import { resetPassword } from './reset-password.js';
import register from './register';
import { newQuiz } from './new-quiz';
import { module } from './module';
import { liveQuiz } from './live-quiz';
import review from './review';
import { result } from './result';
import quizMembers from './quiz-members';
import { leaderboard } from './leaderboard';
import update from 'react-addons-update';
import { feedback } from './feedback';
import { studentHistory } from './student-history';
import { superAdmin } from './super-admin';
import { hashHistory } from 'react-router';

const appReducer = combineReducers({
    user,
    login,
    resetPassword,
    dashboard,
    newModule,
    joinModule,
    register,
    newQuiz,
    module,
    liveQuiz,
    review,
    result,
    quizMembers,
    leaderboard,
    feedback,
    studentHistory,
    superAdmin
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {

        state = undefined;
        hashHistory.push('/');

    }

    if (action.type === 'CLEAR_ERROR') {

        state = update(state, {
            [action.reducerState]: { error: { $set: undefined } }
        });
    }

    return appReducer(state, action);
};

export default rootReducer;
