require('babel-register')({
    presets: ['es2015']
});
var Hapi = require('hapi');
var plugins = require('./plugins');
var routes = require('./routes');

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

    server.route(routes);
    return server;
};
