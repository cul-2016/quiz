export default function sendQuizInvite (socketClient, quizInfo) {
    return setInterval(() => {
        socketClient.emit('send_quiz_invite', quizInfo, (msg) => {
            console.log(msg);
        });
    }, 5000);
}
