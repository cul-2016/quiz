var Index = require('./routes/index');
var GetModules = require('./routes/get-modules');
var ValidateModule = require('./routes/validate-module');
var SaveUser = require('./routes/save-user');
var ValidateUser = require('./routes/authenticate-user');

var routes = [
    Index,
    GetModules,
    ValidateModule,
    SaveUser,
    ValidateUser
];

module.exports = routes;
