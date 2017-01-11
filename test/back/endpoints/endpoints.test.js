const test = require('tape');
const server = require('../../../server/server.js');
const simulateAuthStudents = require('../../utils/simulateAuthStudents.js')(server);
const simulateAuth = require('../../utils/simulateAuth.js')(server);
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
        method: 'post',
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
        method: 'post',
        url: '/submit-new-password',
        payload: {
            code: "reset-password-code-endpoint",
            password: 'testing'
        },
        expected: true
    },
    {
        method: 'get',
        url: '/get-module-list',
        expected: [{ module_id: 'TEST', name: 'test module' }, { module_id: 'CENT', name: 'Percentile' }, { module_id: 'FAC8', name: 'FAC8' }]
    },
    {
        method: 'get',
        url: '/get-module?module_id=TEST',
        expected: { medals: { condition: [39, 69], medal_name: ['bronze', 'silver', 'gold'] }, module_id: 'TEST', name: 'test module', num_enrolled: 5, quizzes: [{ is_last_quiz: false, is_presented: true, name: 'Week 1 Quiz', num_entries: '4', num_questions: '2', quiz_id: 1 }, { is_last_quiz: false, is_presented: true, name: 'Week 2 Quiz', num_entries: '3', num_questions: '3', quiz_id: 2 }], trophies: { condition: [1, 100, 65, 2], trophy_name: ['first_quiz', 'high_score', 'overall_average', 'participation'] } }
    },
    {
        method: 'get',
        url: '/get-user-details',
        expected: { email: 'lecturer@city.ac.uk', expiry_code: null, is_lecturer: true, is_verified: true, reset_password_code: null, user_id: 2, username: 'lecturer', verification_code: null }
    }
].forEach((endpoint) => {
    test(endpoint.url + ' endpoint returns expected payload', (t) => {
        t.plan(1);

        initDb()
        .then(() => simulateAuth())
        .then((token) => {
            const options = {
                method: endpoint.method,
                url: endpoint.url,
                payload: endpoint.payload,
                headers: { Authorization: token, cookie: 'token=' + token },
            };
            return server.inject(options);
        })
        .then((response) => {
            t.deepEqual(response.result, endpoint.expected, 'payload is correct for ' + endpoint.url);
        });
    });
});

// Endpoint Test for Students
[
    {
        method: 'get',
        url: '/get-module-list',
        expected: [{ module_id: 'TEST', name: 'test module' }]
    },
    {
        method: 'get',
        url: '/get-feedback?module_id=TEST',
        expected: { participation: null, quizzes: null, ranking: 10 }
    },
    {
        method: 'get',
        url: '/get-student-history?module_id=TEST&user_id=1',
        expected: [{ name: 'Week 1 Quiz', num_questions: '2', quiz_id: 1, score: 2 }, { name: 'Week 2 Quiz', num_questions: '3', quiz_id: 2, score: 1 }]
    },
    {
        method: 'get',
        url: '/get-module?module_id=TEST',
        expected: { medals: { condition: [39, 69], medal_name: ['bronze', 'silver', 'gold'] }, module_id: 'TEST', name: 'test module', trophies_awarded: { first_quiz: false, high_score: false, overall_average: false, participation: false } }
    },
    {
        method: 'get',
        url: '/get-user-details',
        expected: { email: 'student@city.ac.uk', expiry_code: null, is_lecturer: false, is_verified: true, reset_password_code: null, user_id: 1, username: 'student', verification_code: null }
    }
].forEach((endpoint) => {
    test(endpoint.url + ' endpoint returns correct payload', (t) => {
        t.plan(1);

        initDb()
        .then(() => simulateAuthStudents())
        .then((token) => {
            const options = {
                method: endpoint.method,
                url: endpoint.url,
                headers: { Authorization: token, cookie: 'token=' + token },
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
