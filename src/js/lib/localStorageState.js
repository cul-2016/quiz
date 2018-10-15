import parseCookie from "./parseCookie";

/**
 * Function that returns serialised state from browser local storage
 */

export function loadState () {

    try {
        const serialisedState = localStorage.getItem('state');
        if (serialisedState === null) {
            return undefined;
        }
        return replaceUser(JSON.parse(serialisedState));
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

function replaceUser (state) {
    var user = parseCookie().user_details;
    for(let key in user){
        if(state[key]) {
            state[key]=user[key]
        }
    }
    return state;
}
