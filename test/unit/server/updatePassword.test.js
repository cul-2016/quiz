import test from 'tape';
import { testClient } from '../../utils/init';
import updatePassword from '../../../server/lib/updatePassword';
import query from '../../../server/lib/query';

test('`updatePassword` works', (t) => {

    t.plan(4);

    const reset_password_code = 'reset-password-code';
    const hashedPassword = 'abc123';
    const user_id = 31;
    updatePassword(testClient, reset_password_code, hashedPassword, (error, response) => {

        t.equal(response, true, 'password has now been updated');

        const dbQuery = 'SELECT * from users where user_id = $1';
        const dbArray = [user_id];
        query(testClient, dbQuery, dbArray, (error, response) => {
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
