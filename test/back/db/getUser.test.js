const test = require('tape');
const getUserByEmail = require('../../../server/lib/getUserByEmail');
const { pool } = require('../../utils/init');
const expectedRows = require('../../utils/data-fixtures').users;

test('`getUserByEmail` works', (t) => {

    t.plan(1);
    const emailAddress = 'student@city.ac.uk';

    getUserByEmail(pool, emailAddress, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct details for the user');
    });
});
