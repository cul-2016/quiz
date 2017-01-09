const test = require('tape');
const getQuizIDList = require('../../../server/lib/getQuizIDList');
const expected = require('../../utils/data-fixtures').getQuizIDListData;
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getQuizIDList` works', (t) => {

    t.plan(1);

    initDb()
    .then(() => {

        const module_id = 'TEST';

        getQuizIDList(pool, module_id, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEqual(response, expected, 'database returns a list of quiz ids');
        });

    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});


