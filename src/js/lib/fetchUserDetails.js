import { store } from '../store';
import { getUserDetails } from '../actions/user';
import getUserID from './getUserID';

export default function fetchModules (nextState, replace, callback) {
    const user_id = getUserID();
    if (user_id) {
        store.dispatch(getUserDetails(user_id));
        callback();
    } else {
        replace('/');
        callback();

    }
}
