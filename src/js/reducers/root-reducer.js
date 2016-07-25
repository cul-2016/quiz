import { combineReducers } from 'redux';
import dashboard from './dashboard';
import newModule from './new-module';
import user from './user';
import signup from './signup';
import register from './register';


export default combineReducers({
    user,
    signup,
    dashboard,
    newModule,
    register
});
