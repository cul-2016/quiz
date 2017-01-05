const test = require('tape');
const saveExpiringTokenForUser = require('../../../server/lib/saveExpiringTokenForUser');
const { testClient } = require('../../utils/init');
const query = require('../../../server/lib/query');

test('`saveExpiringTokenForUser` works', (t) => {

    t.plan(3);
    const email = 'student@city.ac.uk';
    const reset_password_code = 'testing-resetting-password-code';
    const expiry_code = '12345667890';
    const expected = {
        email: 'student@city.ac.uk',
        username: 'student'
    };
    saveExpiringTokenForUser(testClient, email, reset_password_code, expiry_code, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expected, 'database returns correct details for the user');

        const queryText = 'SELECT * FROM users WHERE email = $1';
        const userEmail = [email];
        query(testClient, queryText, userEmail, (error, result) => {
            if (error) {
                t.error(error);
            }
            const expected_reset_password_code = result.rows[0].reset_password_code;
            const expected_expiry_code = result.rows[0].expiry_code;
            t.deepEqual(expected_reset_password_code, reset_password_code, 'password code has been set');
            t.deepEqual(expected_expiry_code, expiry_code, 'code expiry has been set');
        });
    });
});
