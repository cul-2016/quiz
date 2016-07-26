import test from 'tape';
import hashPassword from '../../../server/lib/authentication/hashPassword';
import validatePassword from '../../../server/lib/authentication/validatePassword';

test('checking if the password is hashed by bcrypt', (t) => {

    t.plan(2);

    var password = 'testingstudent';
    hashPassword(password, (error, hashedPassword) => {
        if (error) {
            console.error(error);
        }
        t.ok(hashedPassword, 'password has been hashed');
        validatePassword(password, hashedPassword, (error, response) => {
            if (error) {
                console.error(error);
            }
            t.deepEqual(response, true, 'password has been validated');
        });
    });
});
