const test = require('tape');
const validateModuleID = require('../../../server/lib/validateModuleID');
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);
test('`validateModuleID` returns true for a pre-existing module_id', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const expected = true;
        const module_id = 'TEST';

        validateModuleID(pool, module_id, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.ok(typeof response === 'boolean', 'validateModuleID returns a boolean');
            t.deepEqual(response, expected, 'database returns true');
        });
    });
});

test('`validateModuleID` returns false for a pre-existing module_id', (t) => {

    t.plan(2);
    initDb()
    .then(() => {
        const expected = false;
        const module_id = 'NEW1';

        validateModuleID(pool, module_id, (error, response) => {
            if (error) {
                console.error(error);
            }
            t.ok(typeof response === 'boolean', 'validateModuleID returns a boolean');
            t.deepEqual(response, expected, 'database returns false');
        });
    });
});


test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
