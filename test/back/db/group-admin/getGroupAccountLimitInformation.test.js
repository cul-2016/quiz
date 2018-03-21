const test = require('tape');
const getGroupAccountLimitInformation = require('../../../../server/lib/group-admin/getGroupAccountLimitInformation');
const pool = require('../../../utils/dbClient.js');
const redisCli = require('../../../utils/configureRedis.js');
const initDb = require('../../../utils/initDb.js')(pool, redisCli);

test('`getGroupAccountLimitInformation` gets the count of users using the code and the user limit for this institution', (t) => {

    t.plan(1);

    initDb()
        .then(() => {
            const group_code = 'groupadminsecretcode';
            const expectedRows = [{ count: 3, user_limit: 1000 }];

            getGroupAccountLimitInformation(pool, group_code, (error, response) => {

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
