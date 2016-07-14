import { combineReducers } from 'redux';
import dashboard from './dashboard';
import newModule from './new-module';


export default combineReducers({
    dashboard,
    newModule
});
