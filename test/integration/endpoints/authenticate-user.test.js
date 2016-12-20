import test from 'tape';
import { server } from '../../utils/init';

test('`authenticate-user` endpoint returns true when password matches', (t) => {
    t.plan(2);
    const options = {
        method: 'POST',
        url: '/authenticate-user',
        payload: {
            email: 'authenticate-user@city.ac.uk',
            password: 'testinglecturer',
        }
    };
    const expectedResponse = {
        email: 'authenticate-user@city.ac.uk',
        is_lecturer: true,
        user_id: 28,
        username: 'lecturer',
        is_verified: true,
        code_expiry: null,
        verification_code: null,
        reset_password_code: null
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.deepEqual(response.result, expectedResponse, 'Get data back');
    });

});

test('`authenticate-user` endpoint returns a message when password do not match', (t) => {
    t.plan(2);
    const options = {
        method: 'POST',
        url: '/authenticate-user',
        payload: {
            email: 'lecturer@city.ac.uk',
            password: 'testinglecDSFD',
        }
    };

    server.inject(options, (response) => {
        t.equal(response.statusCode, 200, '200 status code');
        t.ok(/password/.test(response.result.message), 'get password error message');
    });

});

test('`authenticate-user` endpoint returns a message when email entered does not exist', (t) => {
    t.plan(2);
    const options = {
        method: 'POST',
        url: '/authenticate-user',
        payload: {
            email: 'fakeEmail@city.ac.uk',
            password: 'testinglecDSFD',
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(/does not exist/.test(response.result.message), 'get no user exists message');
    });

});


test('`authenticate-user` endpoint returns a message when user is not verified', (t) => {
    t.plan(2);
    const options = {
        method: 'POST',
        url: '/authenticate-user',
        payload: {
            email: 'not-authenticated-user@city.ac.uk',
            password: 'testinglecturer',
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(/not verified/.test(response.result.message), 'get no user exists message');
    });

});
