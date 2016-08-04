import { combineReducers } from 'redux';
import dashboard from './dashboard';
import newModule from './new-module';
import user from './user';
import login from './login';
import register from './register';
import newQuiz from './new-quiz';


export default combineReducers({
    user,
    login,
    dashboard,
    newModule,
    register,
    newQuiz
});
