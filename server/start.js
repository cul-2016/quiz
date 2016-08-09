var Server = require('./server.js');
var socket = require('socket.io');
var socketRouter = require('./socketRouter');

var server = Server.init(process.env.PORT || 9000);

var io = socket(server.listener);
io.on('connection', socketRouter);

server.start((error) => {
    if (error) {
        console.error(error);
        throw new Error("Could not start server:", error);
    }
    console.info('🌍 The server is running on: ', server.info.uri, server.info.protocol);
});
