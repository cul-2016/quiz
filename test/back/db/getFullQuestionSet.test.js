const test = require('tape');
const getFullQuestionSet = require('../../../server/lib/getFullQuestionSet');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getFullQuestionSet` Gets datadump of all answer set', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const expected = 36;
        getFullQuestionSet(pool, (error, response) => {
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
