var server = require('./server.js');
var socket = require('socket.io');

var io = socket(server.listener);
io.on('connection', (socket) => {

    io.emit('we have connected', socket.id);
    console.log("CONNECTION!", socket.id); //eslint-disable-line no-console

    socket.on('disconnect', () => {
        console.log('DISCONNECTED'); //eslint-disable-line no-console
        io.emit('disconnected', socket.id);
    });

    /****/

    socket.on('join_room', (room, cb) => {

        socket.join(room);

        cb('Successfully joined room: >>>' + room);
    });

    socket.on('student_joined_quiz', (room, cb) => {

        socket.broadcast.to(room).emit('num_participants', socket.adapter.rooms[room].length - 1);
        cb('Successfully emitted number: >>>' + socket.adapter.rooms[room].length - 1);
    });

    socket.on('send_quiz_invite', (quizInfo, cb) => {

        var room = quizInfo.room;
        var quiz_id = quizInfo.quiz_id;


        // broadcast to whole room
        console.log("still sending quiz invite"); //eslint-disable-line no-console
        socket.broadcast.to(room).emit('receive_quiz_invite', quiz_id);
        cb('STUDENTS INVITED TO QUIZ', room);
    });

    socket.on('send_next_question', (data, cb) => {

        var room = data.room;
        var nextQuestion = data.questionObj;
        socket.broadcast.to(room).emit('receive_next_question', nextQuestion);
        console.log('NEXT QUESTION SENT', nextQuestion, room); //eslint-disable-line no-console
        cb('Done');
    });

    socket.on('end_of_quiz', (data, cb) => {
        var room = data.room;
        var quiz_id = data.quiz_id;
        socket.broadcast.to(room).emit('receive_end_of_quiz', quiz_id);

        console.log('end of quiz sent'); //eslint-disable-line no-console
        cb('end of quiz sent');
    });

    socket.on('abort_quiz', (data, cb) => {
        var room = data.room;
        var quiz_id = data.quiz_id;
        socket.broadcast.to(room).emit('receive_abort_quiz', quiz_id);

        console.log('quiz has been aborted'); //eslint-disable-line no-console
        cb('quiz has been aborted');
    });

    socket.on('leave_room', (cb) => {

        var roomList = Object.keys(socket.rooms).filter((room) => {
            return !room.match(/\/#.*/);
        });
        roomList.forEach((room) => {
            socket.leave(room);
        });
        cb(`Successfully left room:>>>${roomList}<<< with exception of default room`);
    });

});

server.start((error) => {
    if (error) {
        console.error(error);
        throw new Error("Could not start server:", error);
    }
    console.info('🌍 The server is running on: ', server.info.uri, server.info.protocol); //eslint-disable-line no-console
});
