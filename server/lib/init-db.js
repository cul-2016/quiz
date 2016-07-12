'use strict';
var Pool = require('pg').Pool;

process.on('unhandledRejection', (e) => {
    console.error(e.message, e.stack);
});
let db_url = process.env.TESTING ? 'testing' : 'remote-db-url';
const pool = new Pool({ database: db_url, idleTimeoutMillis: 2000 });

module.exports = pool;
