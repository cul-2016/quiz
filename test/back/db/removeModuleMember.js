const test = require('tape');
const removeModuleMember = require('../../../server/lib/removeModuleMember');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`removeModuleMember` works', (t) => {

    t.plan(2);

    initDb()
    .then(() => {        
        const expectedError = null;
        const expectedCommand = 'DELETE';
        const module_id = 'CENT';
        const user_id = 17;

        removeModuleMember(pool, module_id, user_id, (error, response) => {
            t.equal(error, expectedError, 'error is null, user is deleted from the db correctly.');
            t.deepEqual(response.command, expectedCommand, 'Correct command of DELETE, user is deleted from module');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
