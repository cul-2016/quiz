export function loadUserState () {

    try {
        const serialisedState = localStorage.getItem('userState');
        if (serialisedState === null) {
            return undefined;
        }
        return JSON.parse(serialisedState);
    } catch (error) {

        return undefined;
    }
}

export function saveUserState (userState) {
    try {
        const serialisedState = JSON.stringify(userState);
        localStorage.setItem('userState', serialisedState);
    } catch (error) {

        console.error("Could not save user state in localstorage");
    }
}
