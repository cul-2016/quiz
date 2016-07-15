import test from 'tape';
import hashPassword from '../../../server/lib/authentication/hashPassword';
import bcrypt from 'bcrypt';


test('checking if the password is hashed by bcrypt', (t) => {

    t.plan(1);

    var password = 'testing123';
    hashPassword(password, (error, hashedPassword) => {
        if (error) {
            console.error(error);
        }
        bcrypt.compare(password, hashedPassword, (error, response) => {
            if (error) {
                console.error(error);
            }
            t.deepEqual(response, true, 'password has been set correctly');
        });
    });
});
