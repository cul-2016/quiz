const pg = require('pg');
const redis = require('redis');
const bluebird = require('bluebird');
const env = process.env;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

exports.register = (server, options, next) => {
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
    
    server.app.redisCli = redis.createClient({
        host: '127.0.0.1',
        port: 6379,
        db: env.CIRCLE_CI ? 1 : env.TESTING ? 2 : 0
    });

// if (process.env.CIRCLE_CI) {
//     config = {
//         database: 'circle_test'
//     };
// } else if (process.env.TESTING) {
//     config = {
//         database: 'testing'
//     };
// } else {
//     config = {
//         user: process.env.DATABASE_USER,
//         password: process.env.DATABASE_PASSWORD,
//         host: process.env.DATABASE_HOST,
//         port: process.env.DATABASE_PORT,
//         database: process.env.DATABASE_NAME,
//         ssl: true
//     };
// }
// 
// config.max = '20';
// config.idleTimeoutMillis = 3000;

    server.app.pool = new pg.Pool(config);

    next();
}

exports.register.attributes = { pkg: { name: 'database' } };
