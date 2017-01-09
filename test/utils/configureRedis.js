const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const redisCli = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
    db: 0
});

module.exports = redisCli;
