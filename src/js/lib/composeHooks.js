/**
 * Composes multiple react router onEnter hooks
 * @params {function} ...hooks - the functions you want to run serially
 */


export default function composeHooks (...hooks) {

    return function onEnter (nextState, replace, executeTransition) {

        (function executeHooksSynchronously (remainingHooks) {

            if (!remainingHooks.length) return executeTransition();
            let nextHook = remainingHooks[0];
            if (nextHook.length >= 3) {
                nextHook.call(this, nextState, replace, () => {
                    executeHooksSynchronously(remainingHooks.slice(1));
                });
            } else {
                nextHook.call(this, nextState, replace);
                executeHooksSynchronously(remainingHooks.slice(1));
            }
        })(hooks);
    };
}
