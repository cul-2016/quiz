export function sendNextQuestion (socketClient, nextQuestion, callback) {

    if (arguments.length !== 3 || typeof socketClient !== 'object' || Array.isArray(nextQuestion) || typeof callback !== 'function') {
        throw new Error('`sendNextQuestion`:\n @param {object}: socket.io client\n @param {array}: next question \n @param {function}: callback');
    }

    socketClient.emit('send_next_question', nextQuestion, (msg) => {
        //dispatch to increment number
        console.log(msg);
        callback();
    });
}
