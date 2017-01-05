const test = require('tape');
const { server, testClient } = require('../../utils/init');

test('`save-user` endpoint: new lecturer registration --> verification email', (t) => {

    t.plan(2);
    const options = {
        method: 'POST',
        url: '/save-user',
        payload: {
            email: 'franzmoro@hotmail.com',
            password: 'testinglecturer',
            is_lecturer: true
        }
    };

    server.inject(options, (response) => {
        t.equal(response.statusCode, 200, '200 status code');

        const actual = response.result;
        const expected = { emailSent: true };
        t.deepEqual(actual, expected, 'Sent verification email');
    });
});

test('`save-user` endpoint: existing user registration --> user exists message', (t) => {

    t.plan(2);
    const options = {
        method: 'POST',
        url: '/save-user',
        payload: {
            email: 'lecturer@city.ac.uk',
            password: 'testinglecturer',
            is_lecturer: true
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.deepEqual(response.result, { message: 'user exists' }, 'email has been sent');
    });
});

test('`save-user` endpoint works when a student registers', (t) => {

    t.plan(4);
    const options = {
        method: 'POST',
        url: '/save-user',
        payload: {
            email: 'sohilpandya1990@gmail.com',
            password: 'testingstudent',
            is_lecturer: false,
            username: 'testingstudent'
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');

        const options = {
            method: 'POST',
            url: '/authenticate-user',
            payload: {
                email: 'lecturer@city.ac.uk',
                password: 'testinglecturer',
            }
        };
        const expectedResponse = {
            email: 'lecturer@city.ac.uk',
            is_lecturer: true,
            user_id: 2,
            username: 'lecturer',
            is_verified: true,
            expiry_code: null,
            verification_code: null,
            reset_password_code: null
        };

        server.inject(options, (response) => {

            t.equal(response.statusCode, 200, '200 status code');
            t.deepEqual(response.result, expectedResponse, 'Successfully retrieves user info');
        });
    });
});



test.skip('deleting recently added users from the database', (t) => {

    testClient.connect((error, client, done) => {
        if (error) {
            console.error(error, 'error from deleting lecturer from the database');
        }
        client.query('DELETE FROM users WHERE email = $1', ['franzmoro@hotmail.com']);
        client.query('DELETE FROM users WHERE email = $1', ['sohilpandya1990@gmail.com']);
        done();
        t.end();
    });
});