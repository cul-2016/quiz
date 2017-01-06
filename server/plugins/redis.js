const redis = require('redis');
const bluebird = require('bluebird');
const env = process.env;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const config = {
    host: '127.0.0.1',
    port: 6379,
    db: env.CIRCLE_CI ? 1 : env.TESTING ? 2 : 0
};
exports.register = (server, options, next) => {

    server.app.redisCli = redis.createClient(config);
    next();
}

exports.register.attributes = { pkg: { name: 'redis' } };
