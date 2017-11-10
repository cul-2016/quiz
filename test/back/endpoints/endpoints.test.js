const test = require('tape');
const server = require('../../../server/server.js');
const simulateAuthStudents = require('../../utils/simulateAuthStudents.js')(server);
const simulateAuth = require('../../utils/simulateAuth.js')(server);
const pool = require('../../utils/dbClient.js');
const redisCli = server.app.redisCli;
const initDb = require('../../utils/initDb.js')(pool, redisCli);

const { moduleInfo } = require('../../utils/data-fixtures.js');
const lecturerCreds = { email: 'authenticate-user@city.ac.uk', password: 'testinglecturer' };
const franzCreds = { email: 'franzmoro@hotmail.com', password: 'testinglecturer', is_lecturer: true };

const sinon = require('sinon');
const sendemail = require('sendemail');

let email;
let redis;

if (!process.env.TESTING) {
    throw new Error("Please set the testing environment variable!");
}

test('/ endpoint works returns the correct payload', (t) => {
    t.plan(1);

    initDb()
    .then(() => {
        email = sinon.stub(
            sendemail,
            'email',
            (name, person, cb) => cb(null)
        );

        return Promise.resolve();
    })
    .then(() => server.inject('/'))
    .then((response) => {
        email.restore();
        t.ok(response.payload.indexOf('<title>Quodl</title>') > -1, "index page loads correctly!");
    })
    .catch((err) => {
        email.restore();
        t.error(err);
    });
});

test('/authenticate-user endpoint returns error for setAsync Redis call', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        redis = sinon.stub(
            redisCli,
            'setAsync'
        );

        return Promise.reject({ error: 'setAsync returned an error' });
    })
    .catch((err) => {
        redis.restore();
        t.deepEqual(err, { error: 'setAsync returned an error' }, 'returns correct error object');
    });
});
test('/authenticate-user endpoint returns error for delAsync Redis call', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        redis = sinon.stub(
            redisCli,
            'delAsync'
        );

        return Promise.reject({ error: 'delAsync returned an error' });
    })
    .catch((err) => {
        redis.restore();
        t.deepEqual(err, { error: 'delAsync returned an error' }, 'returns correct error object');
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
            reset_password_code: null,
            is_super_admin: false
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
            verification_code: null,
            is_super_admin: false
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
        method: 'post',
        url: '/super-admin/delete',
        payload: {
            user_id: 2
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
        expected: moduleInfo
    },
    {
        method: 'get',
        url: '/get-user-details',
        expected: { email: 'lecturer@city.ac.uk', expiry_code: null, is_lecturer: true, is_super_admin: true, is_verified: true, reset_password_code: null, user_id: 2, username: 'lecturer', verification_code: null }
    },
    {
        method: 'get',
        url: '/super-admin',
        expected: { lecturers: [{ email: 'authenticate-user@city.ac.uk', is_lecturer: true, user_id: 28, username: 'lecturer' }, { email: 'lecturer@city.ac.uk', is_lecturer: true, user_id: 2, username: 'lecturer' }, { email: 'not-authenticated-user@city.ac.uk', is_lecturer: true, user_id: 29, username: 'lecturer' }, { email: 'verification@email.com', is_lecturer: true, user_id: 27, username: 'lecturer-test-verify' }, { email: 'verify-lecturer@city.ac.uk', is_lecturer: true, user_id: 25, username: 'verify-lecturer' }], students: [{ email: 'apu@simpsons.com', is_lecturer: false, user_id: 11, username: 'Apu' }, { email: 'bart@simpsons.com', is_lecturer: false, user_id: 8, username: 'Bart' }, { email: 'comicbookguy@simpsons.com', is_lecturer: false, user_id: 19, username: 'Comic Book Guy' }, { email: 'drnick@simpsons.com', is_lecturer: false, user_id: 23, username: 'Dr Nick' }, { email: 'expiredpassword@city.ac.uk', is_lecturer: false, user_id: 32, username: 'expired-password' }, { email: 'homer@simpsons.com', is_lecturer: false, user_id: 5, username: 'Homer' }, { email: 'krusty@simpsons.com', is_lecturer: false, user_id: 20, username: 'Krusty' }, { email: 'lisa@simpsons.com', is_lecturer: false, user_id: 7, username: 'Lisa' }, { email: 'maggie@simpsons.com', is_lecturer: false, user_id: 9, username: 'Maggie' }, { email: 'marge@simpsons.com', is_lecturer: false, user_id: 6, username: 'Marge' }, { email: 'milhouse@simpsons.com', is_lecturer: false, user_id: 15, username: 'Milhouse' }, { email: 'mina@city.ac.uk', is_lecturer: false, user_id: 4, username: 'Mina' }, { email: 'mrburns@simpsons.com', is_lecturer: false, user_id: 13, username: 'Mr Burns' }, { email: 'ned@simpsons.com', is_lecturer: false, user_id: 10, username: 'Ned' }, { email: 'nelson@simpsons.com', is_lecturer: false, user_id: 16, username: 'Nelson' }, { email: 'patty@simpsons.com', is_lecturer: false, user_id: 17, username: 'Patty' }, { email: 'principalskinner@simpsons.com', is_lecturer: false, user_id: 24, username: 'Principal Skinner' }, { email: 'reset-password-endpoint@city.ac.uk', is_lecturer: false, user_id: 33, username: 'reset-password' }, { email: 'revlovejoy@simpsons.com', is_lecturer: false, user_id: 14, username: 'Rev Lovejoy' }, { email: 'selma@simpsons.com', is_lecturer: false, user_id: 18, username: 'Selma' }, { email: 'sideshowbob@simpsons.com', is_lecturer: false, user_id: 21, username: 'Sideshow Bob' }, { email: 'sideshowmel@simpsons.com', is_lecturer: false, user_id: 22, username: 'Sideshow Mel' }, { email: 'smithers@simpsons.com', is_lecturer: false, user_id: 12, username: 'Smithers' }, { email: 'sohil@city.ac.uk', is_lecturer: false, user_id: 3, username: 'Sohil' }, { email: 'sohilpandya@foundersandcoders.com', is_lecturer: false, user_id: 30, username: 'reset-password-student' }, { email: 'student@city.ac.uk', is_lecturer: false, user_id: 1, username: 'student' }, { email: 'validexpiry@city.ac.uk', is_lecturer: false, user_id: 31, username: 'valid-password-expiry' }, { email: 'verify-student@city.ac.uk', is_lecturer: false, user_id: 26, username: 'verify-student' }] }
    },
    {
        method: 'post',
        url: '/generate-share-id',
        payload: { quiz_id: 1 },
        expected: true
    },
    {
        method: 'post',
        url: '/generate-share-id',
        payload: { survey_id: 1 },
        expected: true
    },
    {
        method: 'post',
        url: '/generate-share-id',
        expected: { statusCode: 400, error: 'Bad Request', message: '"value" must be an object', validation: { source: 'payload', keys: [''] } }
    },
    {
        method: 'post',
        url: '/submit-import-code',
        payload: { import_code: 'testingsharecodeforquiz', module_id: 'TEST' },
        expected: true
    },
    {
        method: 'post',
        url: '/submit-import-code',
        payload: { import_code: 'fake', module_id: 'TEST' },
        expected: { message: 'Quiz does not exist' }
    },
].forEach((endpoint) => {
    test(endpoint.url + ' endpoint returns expected payload', (t) => {
        t.plan(1);

        initDb()
        .then(() => {
            email = sinon.stub(
                sendemail,
                'email',
                (name, person, cb) => cb(null)
            );

            return Promise.resolve();
        })
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
            email.restore();
            t.deepEqual(response.result, endpoint.expected, 'payload is correct for ' + endpoint.url);
        })
        .catch((err) => {
            email.restore();
            t.error(err);
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
        expected: { medals: { condition: [39, 69], medal_name: ['bronze', 'silver', 'gold'] }, module_id: 'TEST', name: 'test module', trophies_awarded: { first_quiz: false, high_score: false, overall_score: false, participation: false } }
    },
    {
        method: 'get',
        url: '/get-user-details',
        expected: { email: 'student@city.ac.uk', expiry_code: null, is_lecturer: false, is_super_admin: false, is_verified: true, reset_password_code: null, user_id: 1, username: 'student', verification_code: null }
    }
].forEach((endpoint) => {
    test(endpoint.url + ' endpoint returns correct payload', (t) => {
        t.plan(1);

        initDb()
        .then(() => {
            email = sinon.stub(
                sendemail,
                'email',
                (name, person, cb) => cb(null)
            );

            return Promise.resolve();
        })
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
            email.restore();
            t.deepEqual(response.result, endpoint.expected, 'payload is correct for ' + endpoint.url);
        })
        .catch((err) => {
            email.restore();
            t.error(err);
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
