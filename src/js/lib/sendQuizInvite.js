/**
 * Emits websocket event `send_quiz_invite`.  Void.
 * @param {object} socketClient - socket.io client
 * @param {object} quizInfo - object containing quiz information
 */

export default function sendQuizInvite (socketClient, quizInfo) {

    return setInterval(() => {
        socketClient.emit('send_quiz_invite', quizInfo, (msg) => {
            console.log(msg);
        });
    }, 5000);
}
