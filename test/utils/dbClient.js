const pg = require('pg');
let config;

if (process.env.CIRCLE_CI) {
    config = {
        user: 'postgres',
        database: 'circle_test',
        host: 'localhost',
        port: 5432
    };
} else if (process.env.TESTING) {
    config = {
        database: 'testing'
    };
} else {
    config = {
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE_NAME,
        ssl: true
    };
}

// config.max = '20'; removing the max config for now
config.idleTimeoutMillis = 3000;

module.exports = new pg.Pool(config);
