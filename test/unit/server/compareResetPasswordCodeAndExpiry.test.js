import test from 'tape';
import { testClient } from '../../utils/init';
import compareResetPasswordCodeAndExpiry from '../../../server/lib/compareResetPasswordCodeAndExpiry';


test('`compareResetPasswordCodeAndExpiry` returns true when the expiry code and reset token exist', (t) => {

    t.plan(1);
    let reset_password_code = 'reset-password-code';
    let expected = true;

    compareResetPasswordCodeAndExpiry(testClient, reset_password_code, (error, response) => {

        if (error) {
            t.error(error);
        }
        t.deepEqual(response, expected);
    });
});

test('`compareResetPasswordCodeAndExpiry` returns error message that the reset code has not been found', (t) => {

    t.plan(1);
    let reset_password_code = 'reset-password-code-fake';
    let expected = { message: "Sorry, your reset request has not been found" };

    compareResetPasswordCodeAndExpiry(testClient, reset_password_code, (error, response) => {

        if (error) {
            t.error(error);
        }
        t.deepEqual(response, expected);
    });
});

test('`compareResetPasswordCodeAndExpiry` returns an error message that the expiry code has expired', (t) => {

    t.plan(1);
    let reset_password_code = 'reset-password-code-2';
    let expected = { message: "Sorry, your reset password link has expired, please submit another reset request" };

    compareResetPasswordCodeAndExpiry(testClient, reset_password_code, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected);
    });
});
