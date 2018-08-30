// configuring the server object
const Inert = require('inert');
const JWT = require('hapi-auth-jwt2');
const https = require('hapi-require-https');
const Database = require('./database.js');
const Strategy = require('./strategy.js');
const Auth = require('./authenticate-user.js');

// api routes
const modules = require('./modules.js');
const users = require('./users.js');
const quizes = require('./quizes.js');
const superAdmin = require('./super-admin.js');
const groupAdmin = require('./group-admin.js');

const forumSchedule = require('./forum-schedule.js');

const lti = require('./lti.js');

const plugins = [
    Inert,
    JWT,
    https,
    Database,
    Strategy,
    Auth,
    lti,
    forumSchedule,

    modules,
    users,
    quizes,
    superAdmin,
    groupAdmin
];

module.exports = plugins;
