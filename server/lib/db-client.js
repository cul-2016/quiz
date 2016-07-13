var pg = require('pg');
var database;

if (process.env.CIRCLE_CI) {
    database = 'circle_test';
} else if (process.env.TESTING) {
    database = 'testing';
} else {
    database = process.env.DATABASE_URL;
}

console.log("DATABASE:", database);


var config = {
    database: database,
    max: '100',
    idleTimeoutMillis: 3000
};

var pool = new pg.Pool(config);

module.exports = pool;
