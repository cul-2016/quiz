var Inert = require('inert');
var Index = require('./routes/index');

var plugins = [
    Inert,
    Index
];

module.exports = plugins;
