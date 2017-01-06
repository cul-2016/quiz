const test = require('tape');
const server = require('../../../server/server.js');
const pool = require('../../utils/dbClient.js');
const redisCli = server.app.redisCli;
const initDb = require('../../utils/initDb.js')(pool, redisCli);

const lecturerCreds = { email: 'authenticate-user@city.ac.uk', password: 'testinglecturer' };
const franzCreds = { email: 'franzmoro@hotmail.com', password: 'testinglecturer', is_lecturer: true };

if (!process.env.TESTING) {
    throw new Error("Please set the testing environment variables!");
}

test('/ endpoint works returns the correct payload', (t) => {
    t.plan(1);

    initDb()
    .then(() => server.inject('/'))
    .then((response) => {
        t.ok(response.payload.indexOf('<title>Quiz App</title>') > -1, "index page loads correctly!");
    });
});

// endpoint payloads
[
    {
        url: '/authenticate-user',
        method: 'post',
        payload: lecturerCreds,
        expected: {
            email: 'authenticate-user@city.ac.uk',
            is_lecturer: true,
            user_id: 28,
            username: 'lecturer',
            is_verified: true,
            expiry_code: null,
            verification_code: null,
            reset_password_code: null
        }
    },
    {
        method: 'post',
        url: '/authenticate-user',
        payload: {
            email: 'lecturer@city.ac.uk',
            password: 'testinglecDSFD',
        },
        expected: { message: 'please enter a valid email or password' }
    },
    {
        method: 'post',
        url: '/authenticate-user',
        payload: {
            email: 'blah@city.ac.uk',
            password: 'testinglecDSFD',
        },
        expected: { message: 'sorry, this user does not exist' }
    },
    {
        method: 'post',
        url: '/authenticate-user',
        payload: {
            email: 'not-authenticated-user@city.ac.uk',
            password: 'testinglecturer',
        },
        expected: { message: 'user is not verified' }
    },
    {
        method: 'post',
        url: '/reset-password-request',
        payload: { email: 'fake@fake.com' },
        expected: { message: 'Sorry the email does not exist' }
    },
    {
        method: 'post',
        url: '/save-user',
        payload: franzCreds,
        expected: {
            emailSent: true
        }
    },
    {
        method: 'post',
        url: '/save-user',
        payload: {
            email: 'lecturer@city.ac.uk',
            password: 'testinglecturer',
            is_lecturer: true
        },
        expected: {
            message: 'user exists'
        }
    },
    {
        method: 'post',
        url: '/save-user',
        payload: {
            email: 'sohilpandya1990@gmail.com',
            password: 'testingstudent',
            is_lecturer: false,
            username: 'testingstudent'
        },
        expected: {
            email: 'sohilpandya1990@gmail.com',
            expiry_code: null,
            is_lecturer: false,
            is_verified: true,
            reset_password_code: null,
            user_id: 34,
            username: 'testingstudent',
            verification_code: null
        }
    },
    {
        method: 'POST',
        url: '/submit-new-password',
        payload: {
            code: "reset-password-code-2",
            password: 'testing'
        },
        expected: {
            message: 'Sorry, your reset password link has expired, please submit another reset request'
        }
    },
    {
        method: 'POST',
        url: '/submit-new-password',
        payload: {
            code: "reset-password-code-endpoint",
            password: 'testing'
        },
        expected: true
    }
].forEach((endpoint) => {
    test(endpoint.url + ' endpoint returns true when password matches', (t) => {
        t.plan(1);

        initDb()
        .then(() => {
            const options = {
                method: endpoint.method,
                url: endpoint.url,
                payload: endpoint.payload
            };
            return server.inject(options);
        })
        .then((response) => {
            t.deepEqual(response.result, endpoint.expected, 'payload is correct for ' + endpoint.url);
        });
    });
});

// TEST THIS IN ANOTHER FILE
// test('`verify-user` endpoint returns true and redirects to `please-verify` for non-verified lecturers', (t) => {
//     t.plan(2);
//
//     const options = {
//         method: 'GET',
//         url: '/verification?code=testing-verification-code-lecturer',
//         payload: {
//             email: 'verification@email.com',
//             password: 'testinglecturer',
//         }
//     };
//
//     server.inject(options, (response) => {
//         t.equal(response.statusCode, 302, '302 status code (redirect)');
//         t.equal(response.headers.location, '/#/verification/true', 'redirects to correct path');
//     });
//
// });
//
// test('`verify-user` endpoint returns false and redirects to `verification-error` for already-verified lecturers', (t) => {
//     t.plan(2);
//
//     const options = {
//         method: 'GET',
//         url: '/verification?code=testing-verification-code-non-existent',
//         payload: {
//             email: 'franzmoro@hotmail.com',
//             password: 'testinglecturer',
//         }
//     };
//
//     server.inject(options, (response) => {
//         t.equal(response.statusCode, 302, '302 status code (redirect)');
//         t.equal(response.headers.location, '/#/verification/false', 'redirects to correct path');
//     });
//
// });

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
