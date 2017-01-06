const Inert = require('inert');
const JWT = require('hapi-auth-jwt2');
const Redis = require('./plugins/redis.js');
const Strategy = require('./plugins/strategy.js');
const Auth = require('./plugins/authenticate-user.js');
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
