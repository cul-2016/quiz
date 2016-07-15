var Index = require('./routes/index');
var GetModules = require('./routes/get-modules');
var ValidateModule = require('./routes/validate-module');
var SaveUser = require('./routes/save-user');

var routes = [
    Index,
    GetModules,
    ValidateModule,
    SaveUser
];

module.exports = routes;
