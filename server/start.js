var Server = require('./server.js');
var server = Server.init(process.env.PORT || 9000);

server.start((error) => {
    if (error) {
        throw new Error("Could not start server:", error);
    }
    console.info('🌍 The server is running on: ', server.info.uri);
});
