const pg = require('pg');
let config;

if (process.env.CIRCLE_CI) {
    config = {
        database: 'circle_test'
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

config.max = '20';
config.idleTimeoutMillis = 3000;

module.exports = new pg.Pool(config);
