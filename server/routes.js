var Index = require('./routes/index');
var GetModules = require('./routes/get-modules');
var ValidateModule = require('./routes/validate-module');

var routes = [
    Index,
    GetModules,
    ValidateModule
];

module.exports = routes;
