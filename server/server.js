const Hapi = require('hapi');
const plugins = require('./plugins.js');
const assert = require('assert');

const server = new Hapi.Server();

server.connection({
    host: "0.0.0.0",
    port: process.env.PORT || 9000,
    routes: { cors: true }
});

server.register(plugins, (error) => {
    assert(!error, error);

    server.route({
        method: 'get',
        path: '/{all*}',
        handler: { directory: { path: 'public' } }
    });
});

module.exports = server;
