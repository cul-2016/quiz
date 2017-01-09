const test = require('tape');
const saveExpiringTokenForUser = require('../../../server/lib/saveExpiringTokenForUser');
const query = require('../../../server/lib/query');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`saveExpiringTokenForUser` works', (t) => {

    t.plan(3);

    initDb()
    .then(() => {
        const email = 'student@city.ac.uk';
        const reset_password_code = 'testing-resetting-password-code';
        const expiry_code = '12345667890';
        const expected = {
            email: 'student@city.ac.uk',
            username: 'student'
        };
        saveExpiringTokenForUser(pool, email, reset_password_code, expiry_code, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEquals(response, expected, 'database returns correct details for the user');

            const queryText = 'SELECT * FROM users WHERE email = $1';
            const userEmail = [email];
            query(pool, queryText, userEmail, (error, result) => {
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
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
