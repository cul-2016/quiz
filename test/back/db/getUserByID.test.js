const test = require('tape');
const getUserByID = require('../../../server/lib/getUserByID');
const expectedRows = require('../../utils/data-fixtures').users;
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getUserByID` works', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const user_id = 1;
        getUserByID(pool, user_id, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEquals(response, expectedRows, 'database returns correct details for the user');
        });
    });
});
