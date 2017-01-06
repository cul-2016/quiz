const test = require('tape');
const saveModule = require('../../../server/lib/saveModule');
const { medals, trophies } = require('../../utils/data-fixtures');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);


test('`saveModule` a module to the database works ok', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const expectedError = null;
        const expectedCommand = 'INSERT';
        const module_id = "MOD1";
        const user_id = 1;
        const name = "Test Module";

        saveModule(pool, module_id, user_id, name, medals, trophies, (error, response) => {
            t.equal(error, expectedError, 'error is null, module is saved to db correctly.');
            t.deepEqual(response.command, expectedCommand, 'Correct command of INSERT, module is saved to db correctly');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
