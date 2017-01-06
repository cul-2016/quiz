const test = require('tape');
const server = require('../../../server/server.js');
const simulateAuth = require('../../utils/simulateAuth.js')(server);
const pool = require('../../utils/dbClient.js');
const redisCli = server.app.redisCli;
const initDb = require('../../utils/initDb.js')(pool, redisCli);

const {
    questions,
    updateQuizOptionsPayload,
    newModule,
    expectedStudent,
    expectedLecturer
} = require('../../utils/data-fixtures.js');

const lecturerCreds = { email: 'authenticate-user@city.ac.uk', password: 'testinglecturer' };
const verificationCreds = { email: 'verification@email.com', password: 'testinglecturer' };
const franzCreds = { email: 'franzmoro@hotmail.com', password: 'testinglecturer', is_lecturer: true };

if (!process.env.TESTING) {
    throw new Error("Please set the testing environment variables!");
}

// test('/ endpoint works returns the correct payload', (t) => {
//     t.plan(1);
// 
//     initDb()
//     .then(() => simulateAuth())
//     .then(() => server.inject('/'))
//     .then((response) => {
//         t.ok(response.payload.indexOf('<title>Quiz App</title>') > -1, "index page loads correctly!");
//     });
// });

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
            email: 'not-authenticated-user@city.ac.uk',
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
        expected: { message: 'Sorry the email doesn\'t exits' }
    },
    {
        method: 'post',
        url: '/save-user',
        payload: {
            email: 'franzmoro@hotmail.com',
            password: 'testinglecturer',
            is_lecturer: true
        },
        expected: { 
            emailSent: true
        }
    }
].forEach((endpoint) => {
    test(endpoint.url + ' endpoint returns true when password matches', (t) => {
        t.plan(1);

        const options = {
            method: endpoint.method,
            url: endpoint.url,
            payload: endpoint.payload
        };

        server.inject(options)
            .then((response) => {

                t.deepEqual(response.result, endpoint.expected, 'payload is correct for ' + endpoint.url);
            });

    });
});




// test('`reset-password-request` endpoint works', (t) => {
// 
//     t.plan(1);
// 
//     const email = 'sohilpandya@foundersandcoders.com';
//     const options = {
//         method: 'POST',
//         url: '/reset-password-request',
//         payload: {
//             email
//         }
//     };
// 
//     server.inject(options, (response) => {
//         t.equal(response.statusCode, 200, '200 status code');
//     });
// });
// 
// test('`save-user` endpoint: new lecturer registration --> verification email', (t) => {
// 
//     t.plan(2);
//     const options = {
//         method: 'POST',
//         url: '/save-user',
//         payload: {
//             email: 'franzmoro@hotmail.com',
//             password: 'testinglecturer',
//             is_lecturer: true
//         }
//     };
// 
//     server.inject(options, (response) => {
//         t.equal(response.statusCode, 200, '200 status code');
// 
//         const actual = response.result;
//         const expected = { emailSent: true };
//         t.deepEqual(actual, expected, 'Sent verification email');
//     });
// });
// 
// test('`save-user` endpoint: existing user registration --> user exists message', (t) => {
// 
//     t.plan(2);
//     const options = {
//         method: 'POST',
//         url: '/save-user',
//         payload: {
//             email: 'lecturer@city.ac.uk',
//             password: 'testinglecturer',
//             is_lecturer: true
//         }
//     };
// 
//     server.inject(options, (response) => {
// 
//         t.equal(response.statusCode, 200, '200 status code');
//         t.deepEqual(response.result, { message: 'user exists' }, 'email has been sent');
//     });
// });
// 
// test('`save-user` endpoint works when a student registers', (t) => {
// 
//     t.plan(4);
//     const options = {
//         method: 'POST',
//         url: '/save-user',
//         payload: {
//             email: 'sohilpandya1990@gmail.com',
//             password: 'testingstudent',
//             is_lecturer: false,
//             username: 'testingstudent'
//         }
//     };
// 
//     server.inject(options, (response) => {
// 
//         t.equal(response.statusCode, 200, '200 status code');
//         t.ok(response.result, 'Get data back');
// 
//         const options = {
//             method: 'POST',
//             url: '/authenticate-user',
//             payload: {
//                 email: 'lecturer@city.ac.uk',
//                 password: 'testinglecturer',
//             }
//         };
//         const expectedResponse = {
//             email: 'lecturer@city.ac.uk',
//             is_lecturer: true,
//             user_id: 2,
//             username: 'lecturer',
//             is_verified: true,
//             expiry_code: null,
//             verification_code: null,
//             reset_password_code: null
//         };
// 
//         server.inject(options, (response) => {
// 
//             t.equal(response.statusCode, 200, '200 status code');
//             t.deepEqual(response.result, expectedResponse, 'Successfully retrieves user info');
//         });
//     });
// });
// 
// test('`submit-new-password` endpoint returns an error message when expiry_code has expired', (t) => {
//     t.plan(1);
// 
//     const options = {
//         method: 'POST',
//         url: '/submit-new-password',
//         payload: {
//             code: "reset-password-code-2",
//             password: 'testing'
//         }
//     };
// 
//     server.inject(options, (response) => {
// 
//         t.ok(/expired/.test(response.result.message), 'expiry_code has expired');
//     });
// });
// 
// test('`submit-new-password` endpoint returns an true when the reset_password_code & expiry_code are OK', (t) => {
//     t.plan(1);
// 
//     const options = {
//         method: 'POST',
//         url: '/submit-new-password',
//         payload: {
//             code: "reset-password-code-endpoint",
//             password: 'testing'
//         }
//     };
// 
//     server.inject(options, (response) => {
//         t.equal(response.result, true, 'user password has been updated');
//     });
// });
// 
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
