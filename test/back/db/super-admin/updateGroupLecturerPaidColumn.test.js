const test = require('tape');
const updateGroupLecturerPaidColumn = require('../../../../server/lib/super-admin/updateGroupLecturerPaidColumn');
const pool = require('../../../utils/dbClient.js');
const redisCli = require('../../../utils/configureRedis.js');
const initDb = require('../../../utils/initDb.js')(pool, redisCli);

test('`updateGroupLecturerPaidColumn` saved the new client to the account management table', (t) => {

    t.plan(2);

    initDb()
        .then(() => {

            const paid = false;
            const group_code = 'groupadminsecretcode';
            const expectedError = null;


            updateGroupLecturerPaidColumn(pool, paid, group_code, (error, response) => {
                if (error) {
                    console.error(error);
                }
                t.equal(error, expectedError, 'error is null, module is saved to db correctly.');
                t.deepEqual(response, [{ user_id: 38 }, { user_id: 39 }, { user_id: 41 }], 'Correct command of INSERT, module is saved to db correctly');
            });
        });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
