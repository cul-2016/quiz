import { store } from '../store';
import { getModule } from '../actions/module';
/**
 * Fetches module information.  Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */


export default function fetchModuleDetails (nextState, replace, callback) {

    store.dispatch(getModule(nextState.params.module_id));
    callback();
}
