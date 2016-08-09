function socketRouter (socket) {

    socket.emit('we have connected', socket.id);
    console.log("CONNECTION!", socket.id);

    socket.on('disconnect', () => {
        console.log('DISCONNECTED');
        socket.emit('disconnected', socket.id); // this event is sent back to client
    });

    /****/

    socket.on('join_room', (room, cb) => {

        socket.join(room);
        cb('Successfully joined room: ' + room);
    });

    socket.on('send_quiz_invite', (quizInfo, cb) => {

        var room = quizInfo.room;
        var quiz_id = quizInfo.quiz_id;

        // broadcast to whole room
        socket.broadcast.to(room).emit('receive_quiz_invite', quiz_id);
        cb('THIS IS THE CALLBACK');
    });

    socket.on('send_next_question', (questionInfo, cb) => {
        var room = questionInfo.room;
        var nextQuestion = questionInfo.nextQuestion;
        console.log('NEXT QUESTION SENT', nextQuestion, room);
        socket.broadcast.to(room).emit('receive_next_question', nextQuestion);
        cb('Done');
    });
}

module.exports = socketRouter;
