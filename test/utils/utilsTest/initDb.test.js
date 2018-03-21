const tape = require('tape');
const redisCli = require('../configureRedis.js');
const pool = require('../../utils/dbClient.js');
const initDb = require('../initDb.js')(pool, redisCli);

tape('flush db clears pg database', (t) => {
    t.plan(1);
    initDb()
    .then(() => {
        pool.connect((error, client, done) => {

            client.query(
                'SELECT * FROM users;',
                (error, data) => {
                    done();
                    if (error) {
                        return t.error(error);
                    }
                    t.equal(data.rows.length, 42, 'database has been setup');
                }
            );
        });
    })
    .catch((error) => t.error(error));
});

tape('initDb clears the redis database', (t) => {
    t.plan(3);
    initDb()
    .then(() => redisCli.keysAsync('*'))
    .then((keys) => {
        t.equal(keys.length, 0, 'redis db is empty', 'KYiiYb5Ofc');
        return redisCli.set('key', 'value');
    })
    .then(() => redisCli.keysAsync('*'))
    .then((keys) => {
        t.equal(keys.length, 1, 'redis db has data', 'KYiiYb5Ofc');
        return initDb();
    })
    .then(() => redisCli.keysAsync('*'))
    .then((keys) => {
        t.equal(keys.length, 0, 'redis db is cleared by initDb', 'KYiiYb5Ofc');
        t.end();
    })
    .catch((err) => t.error(err));
});

tape.onFinish(() => {
    pool.end();
    redisCli.quit();
});
