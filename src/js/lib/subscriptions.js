import { getDashboard } from '../actions/dashboard';

/**
 * Dispatches an action to hydrate the dashboard view
 * Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function listenForUserState (store) {

    let unsubscribe = store.subscribe(listener);

    function listener () {

        let status = store.getState().user.is_lecturer;

        if (status !== undefined) {

            unsubscribe();
            store.dispatch(getDashboard());
        }
    }
}
