var Hapi = require('hapi');
var plugins = require('./plugins');

exports.init = (port) => {

    var server = new Hapi.Server();

    server.connection({
        host: "0.0.0.0",
        port: port,
        routes: { cors: true }
    });

    server.register(plugins, (error) => {
        if (error) {
            console.error(error);
        }
    });
    return server;
};
