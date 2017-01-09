const test = require('tape');
const getStudentHistory = require('../../../server/lib/getStudentHistory');
const expected = require('../../utils/data-fixtures').studentHistoryData;
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getStudentHistory` works', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const user_id = 8;
        const module_id = 'CENT';
        getStudentHistory(pool, user_id, module_id, (error, response) => {
            if (error) {
                console.error(error);
            }
            t.deepEqual(response, expected, 'database returns student history');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
