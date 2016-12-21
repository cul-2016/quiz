import test from 'tape';
import { server } from '../../utils/init';

test('`submit-new-password` endpoint returns an error message when expiry_code has expired', (t) => {

    t.plan(1);
    const options = {
        method: 'POST',
        url: '/submit-new-password',
        payload: {
            code: "reset-password-code-2",
            password: 'testing'
        }
    };

    server.inject(options, (response) => {
        t.ok(/expired/.test(response.result), 'expiry_code has expired');
    });
});

test('`submit-new-password` endpoint returns an true when the reset_password_code & expiry_code are OK', (t) => {

    t.plan(1);
    const options = {
        method: 'POST',
        url: '/submit-new-password',
        payload: {
            code: "reset-password-code-endpoint",
            password: 'testing'
        }
    };

    server.inject(options, (response) => {
        t.equal(response.result, true, 'user password has been updated');
    });
});
