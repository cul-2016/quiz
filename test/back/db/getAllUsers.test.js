const test = require('tape');
const getAllUsers = require('../../../server/lib/getAllUsers');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getAllUsers` gets list of all the users in the application', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const expectedRows = 35;

        getAllUsers(pool, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEquals(response.length, expectedRows, 'database returns correct row of users');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
