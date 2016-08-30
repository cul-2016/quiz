/**
 * Runs a function that joins the websocket room
 * Is registered in Module and StudentModule components
 * @param {object} store - redux store
 */
export function joinWebsocketRoom (store, socket) {

    let currentModuleID;
    function listener () {
        let previousModuleID = currentModuleID;

        const state = store.getState();

        currentModuleID = state &&
            state.module &&
            state.module.module &&
            state.module.module.module_id;

        if (previousModuleID !== currentModuleID) {

            socket.emit('join_room', currentModuleID, (msg) => {
                console.log(msg);
            });
        }
    }

    let unsubscribe = store.subscribe(listener); //eslint-disable-line
    listener();

}
