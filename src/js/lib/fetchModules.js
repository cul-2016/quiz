import { store } from '../store';
import { getDashboard } from '../actions/dashboard';

export default function fetchModules () {

    store.dispatch(getDashboard());
}
