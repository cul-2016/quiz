require('babel-register')({
    presets: ['es2015']
});
var Hapi = require('hapi');
var plugins = require('./plugins');
var routes = require('./routes');

const server = new Hapi.Server();

server.connection({
    host: "0.0.0.0",
    port: process.env.PORT || 9000,
    routes: { cors: true }
});

server.register(plugins, (error) => {
    assert(!error, error);

    });
});

    server.route(routes);
module.exports = server;
