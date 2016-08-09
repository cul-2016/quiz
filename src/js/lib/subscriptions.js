/**
 * Runs a function that joins the websocket room
 * Is registered in Module and StudentModule components
 * @param {object} store - redux store
 */
export function joinWebsocketRoom (store, socket) {

    let unsubscribe = store.subscribe(listener);

    function listener () {
        let module_id;
        try {
            module_id = store.getState().module.module.module_id;
        } catch (error) {
            return undefined;
        }

        if (module_id !== undefined) {

            unsubscribe();
            socket.emit('join_room', module_id, (msg) => {
                console.log(msg);
            });
        }
    }
}
