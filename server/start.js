var Server = require('./server.js');
var socket = require('socket.io');

var server = Server.init(process.env.PORT || 9000);

var io = socket(server.listener);
io.on('connection', (socket) => {

    io.emit('we have connected', socket.id);
    console.log("CONNECTION!", socket.id);

    socket.on('disconnect', () => {
        console.log('DISCONNECTED');
        io.emit('disconnected', socket.id); // this event is sent back to client
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
        console.log("still sending quiz invite");
        socket.broadcast.to(room).emit('receive_quiz_invite', quiz_id);
        cb('STUDENTS INVITED TO QUIZ', room);
    });

    socket.on('send_next_question', (data, cb) => {

        var room = data.room;
        var nextQuestion = data.questionObj;
        console.log("EXISTS?", nextQuestion);
        socket.broadcast.to(room).emit('receive_next_question', nextQuestion);
        console.log('NEXT QUESTION SENT', nextQuestion, room);
        cb('Done');
    });
});

server.start((error) => {
    if (error) {
        console.error(error);
        throw new Error("Could not start server:", error);
    }
    console.info('🌍 The server is running on: ', server.info.uri, server.info.protocol);
});
