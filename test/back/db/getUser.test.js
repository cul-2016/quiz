const test = require('tape');
const getUserByEmail = require('../../../server/lib/getUserByEmail');
const expectedRows = require('../../utils/data-fixtures').users;
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getUserByEmail` works', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const emailAddress = 'student@city.ac.uk';
        getUserByEmail(pool, emailAddress, (error, response) => {
            if (error) {
                console.error(error);
            }
            t.deepEquals(response, expectedRows, 'database returns correct details for the user');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
