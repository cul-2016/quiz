const test = require('tape');
const getFullAnswerSet = require('../../../server/lib/getFullAnswerSet');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getFullAnswerSet` Gets datadump of all answer set', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const expected = 135;
        getFullAnswerSet(pool, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEquals(response.length, expected, 'database returns correct datadump');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
