// configuring the server object
const Inert = require('inert');
const JWT = require('hapi-auth-jwt2');
const Database = require('./database.js');
const Strategy = require('./strategy.js');
const Auth = require('./authenticate-user.js');

// api routes
const modules = require('./modules.js');
const users = require('./users.js');
const quizes = require('./quizes.js');

const plugins = [
    Inert,
    Database,
    JWT,
    Strategy,
    Auth,

    modules,
    users,
    quizes
];

module.exports = plugins;
