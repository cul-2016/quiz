/**
 * Function to sent the next question to the students
 * Returns void
 * @param {object} - socketClient - the websocket client
 * @param {object} - nextQuestion - the question to be sent
 * @param {function} - callback - callback function
 */


export function emitSendNextQuestion (socketClient, nextQuestion, callback) {

    if (arguments.length !== 3 || typeof socketClient !== 'object' || typeof nextQuestion !== 'object' || typeof callback !== 'function') {
        throw new Error('`emitSendNextQuestion`:\n @param {object}: socket.io client\n @param {array}: next question \n @param {function}: callback');
    }

    socketClient.emit('send_next_question', nextQuestion, () => {
        //dispatch to increment number
        callback();
    });
}
