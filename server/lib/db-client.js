var pg = require('pg');
var database = process.env.DATABASE_URL;
var config = {
    database: database,
    max: '100',
    idleTimeoutMillis: 3000
};

var pool = new pg.Pool(config);

module.exports = pool;
