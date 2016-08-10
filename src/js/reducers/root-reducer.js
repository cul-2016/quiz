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


export default combineReducers({
    user,
    login,
    dashboard,
    newModule,
    joinModule,
    register,
    newQuiz,
    module,
    liveQuiz
});
