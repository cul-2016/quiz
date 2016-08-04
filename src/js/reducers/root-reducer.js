import { combineReducers } from 'redux';
import dashboard from './dashboard';
import newModule from './new-module';
import user from './user';
import signup from './signup';
import register from './register';
import newQuiz from './new-quiz';


export default combineReducers({
    user,
    signup,
    dashboard,
    newModule,
    register,
    newQuiz
});
