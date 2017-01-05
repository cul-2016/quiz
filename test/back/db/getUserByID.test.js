const test = require('tape');
const getUserByID = require('../../../server/lib/getUserByID');
const { pool } = require('../../utils/init');
const expectedRows = require('../../utils/data-fixtures').users;

test('`getUserByID` works', (t) => {

    t.plan(1);
    const user_id = 1;

    getUserByID(pool, user_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct details for the user');
    });
});
