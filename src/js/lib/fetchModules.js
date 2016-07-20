import { store } from '../store';
import { getDashboard } from '../actions/dashboard';

export default function fetchModules (nextState, replace, callback) {

    store.dispatch(getDashboard());
    callback();
}
