const test = require('tape');
const updateUserIsActive = require('../../../../server/lib/group-admin/updateUserIsActive');
const pool = require('../../../utils/dbClient.js');
const redisCli = require('../../../utils/configureRedis.js');
const initDb = require('../../../utils/initDb.js')(pool, redisCli);

test('`updateUserIsActive` updates the is_user_active column for a given user', (t) => {

    t.plan(1);

    initDb()
        .then(() => {
            const user_id = 38;
            const expectedRows = { is_user_active: false };

            updateUserIsActive(pool, user_id, (error, response) => {

                if (error) {
                    console.error(error);
                }
                t.deepEquals(response, expectedRows, 'database returns correct row of users');
            });
        });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
