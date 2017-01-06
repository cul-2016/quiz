const Inert = require('inert');
const JWT = require('hapi-auth-jwt2');
const Database = require('./plugins/database.js');
const Strategy = require('./plugins/strategy.js');
const Auth = require('./plugins/authenticate-user.js');

// getleaderboard, getfeedback, module -> modules
// savestudentresponse -> quiz

const modules = require('./plugins/modules.js');
const users = require('./plugins/users.js');
const quizes = require('./plugins/quizes.js');
const misc = require('./plugins/misc.js');

const plugins = [
    Inert,
    Database,
    JWT,
    Strategy,
    Auth,
    modules,
    users,
    quizes,
    misc
];

module.exports = plugins;
