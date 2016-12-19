import test from 'tape';
import { server } from '../../utils/init';

test('`verify-user` endpoint returns true and redirects to `please-verify` for non-verified lecturers', (t) => {
    t.plan(2);
    const options = {
        method: 'GET',
        url: '/verification?code=testing-verification-code-franz',
        payload: {
            email: 'franzmoro@hotmail.com',
            password: 'testinglecturer',
        }
    };

    server.inject(options, (response) => {
        t.equal(response.statusCode, 302, '302 status code (redirect)');
        t.equal(response.headers.location, '/#/verification/true', 'redirects to correct path');
    });

});

test('`verify-user` endpoint returns false and redirects to `verification-error` for already-verified lecturers', (t) => {
    t.plan(2);
    const options = {
        method: 'GET',
        url: '/verification?code=testing-verification-code-non-existent',
        payload: {
            email: 'franzmoro@hotmail.com',
            password: 'testinglecturer',
        }
    };

    server.inject(options, (response) => {
        t.equal(response.statusCode, 302, '302 status code (redirect)');
        t.equal(response.headers.location, '/#/verification/false', 'redirects to correct path');
    });

});
