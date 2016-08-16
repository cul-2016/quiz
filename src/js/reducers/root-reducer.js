import { combineReducers } from 'redux';
import dashboard from './dashboard';
import newModule from './new-module';
import joinModule from './join-module';
import user from './user';
import login from './login';
import register from './register';
import newQuiz from './new-quiz';
import module from './module';
import liveQuiz from './live-quiz';
import review from './review';

const appReducer = combineReducers({
    user,
    login,
    dashboard,
    newModule,
    joinModule,
    register,
    newQuiz,
    module,
    liveQuiz,
    review
});

const rootReducer = (state, action) => {

    if (action.type === 'LOGOUT') {

        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
