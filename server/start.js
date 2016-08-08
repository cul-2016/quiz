var Server = require('./server.js');
var server = Server.init(process.env.PORT || 9000);

var socket = require('socket.io');
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

    socket.on('lecturer_start_quiz', (quizInfo, cb) => {

        var room = quizInfo.room;
        var quiz_id = quizInfo.quiz_id;

        // broadcast to whole room
        socket.broadcast.to(room).emit('invite_student_to_quiz', quiz_id);
        cb('THIS IS THE CALLBACK');
    });
});

server.start((error) => {
    if (error) {
        console.error(error);
        throw new Error("Could not start server:", error);
    }
    console.info('🌍 The server is running on: ', server.info.uri, server.info.protocol);
});
