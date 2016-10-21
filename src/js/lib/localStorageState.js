/**
 * Function that returns serialised state from browser local storage
 */

export function loadState () {

    try {
        const serialisedState = localStorage.getItem('state');
        if (serialisedState === null) {
            return undefined;
        }
        return JSON.parse(serialisedState);
    } catch (error) {

        return undefined;
    }
}

/**
 * Function that saves serialised state to browser local storage
 */

export function saveState (state) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem('state', serialisedState);
    } catch (error) {
        console.error("Could not save state in localstorage");
    }
}
