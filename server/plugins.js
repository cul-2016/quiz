const Inert = require('inert');
const Redis = require('./lib/db/redis.js');
const Strategy = require('./lib/authentication/strategy.js');
const Auth = require('./handlers/authenticate-user.js');
const JWT = require('hapi-auth-jwt2');
const modules = require('./plugins/modules.js');
const users = require('./plugins/users.js');
const quizes = require('./plugins/quizes.js');
const misc = require('./plugins/misc.js');

const plugins = [
    Inert,
    Redis,
    JWT,
    Strategy,
    Auth,
    modules,
    users,
    quizes,
    misc
];

module.exports = plugins;
