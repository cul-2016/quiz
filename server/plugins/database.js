const pg = require('pg');
const redis = require('redis');
const bluebird = require('bluebird');
const env = process.env;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

exports.register = (server, options, next) => {
    // TODO: refactor this into just a simple config object
    // This object can then be placed in the root and used by test/utils/dbClient.js
    // and then we won't have this repeated code
    // do after all tests and are implemented
    // and we can test it runs on heroku and circle

    const config = { max: '20', idleTimeoutMillis: 3000 };

    if (env.CIRCLE_CI || env.TESTING) {
        config.database = env.CIRCLE_CI ? 'circle_test' : 'testing';
    } else {
        Object.assign(config, {
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            database: process.env.DATABASE_NAME,
            ssl: true,
        });
    }
    
    server.app.pool = new pg.Pool(config);

    server.app.redisCli = redis.createClient({
        host: '127.0.0.1',
        port: 6379,
        db: env.CIRCLE_CI ? 1 : env.TESTING ? 2 : 0
    });

    next();
}

exports.register.attributes = { pkg: { name: 'database' } };
