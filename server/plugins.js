const Inert = require('inert');
const Redis = require('./lib/db/redis.js');
const Strategy = require('./lib/authentication/strategy.js');
const Auth = require('./handlers/authenticate-user.js');
const JWT = require('hapi-auth-jwt2');

const plugins = [
    Inert,
    Redis,
    JWT,
    Strategy,
    Auth
];

module.exports = plugins;
