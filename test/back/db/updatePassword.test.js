const test = require('tape');
const { pool } = require('../../utils/init');
const updatePassword = require('../../../server/lib/updatePassword');
const query = require('../../../server/lib/query');

test('`updatePassword` works', (t) => {

    t.plan(4);

    const reset_password_code = 'reset-password-code';
    const hashedPassword = 'abc123';
    const user_id = 31;
    updatePassword(pool, reset_password_code, hashedPassword, (error, response) => {

        t.equal(response, true, 'password has now been updated');

        const dbQuery = 'SELECT * from users where user_id = $1';
        const dbArray = [user_id];
        query(pool, dbQuery, dbArray, (error, response) => {
            const user = response.rows[0];
            if (error) {
                t.error(error);
            }
            t.equal(user.reset_password_code, null);
            t.equal(user.expiry_code, null);
            t.equal(user.password, hashedPassword);
        });
    });
});
