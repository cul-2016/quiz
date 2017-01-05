const test = require('tape');
const getModuleList = require('../../../server/lib/getModuleList');
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getModuleList` gets list of modules for a lecturer', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const expectedRows = [
            { module_id: 'TEST', name: 'test module' },
            { module_id: 'CENT', name: 'Percentile' },
            { module_id: 'FAC8', name: 'FAC8' }
        ];
        const user_id = 2;

        getModuleList(pool, user_id, true, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEquals(response, expectedRows, 'database returns correct row of module');
        });
    });
});

test('`getModuleList` gets list of modules for a student', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const expectedRows = [
            { module_id: 'TEST', name: 'test module' }
        ];
        const user_id = 1;

        getModuleList(pool, user_id, false, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEquals(response, expectedRows, 'database returns correct row of module');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});


