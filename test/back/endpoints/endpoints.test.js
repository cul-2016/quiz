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
            group_code: null,
            is_verified: true,
            expiry_code: null,
            verification_code: null,
            reset_password_code: null,
            is_super_admin: false,
            trial_expiry_time: null,
            account_type: null,
            paid: null
        }
    },
    {
        method: 'post',
        url: '/authenticate-user',
        payload: {
            email: 'lecturer@city.ac.uk',
            password: 'testinglecDSFD',
        },
        expected: { message: 'Please enter a valid email or password' }
    },
    {
        method: 'post',
        url: '/authenticate-user',
        payload: {
            email: 'blah@city.ac.uk',
            password: 'testinglecDSFD',
        },
        expected: { message: 'Sorry, this user does not exist' }
    },
    {
        method: 'post',
        url: '/authenticate-user',
        payload: {
            email: 'not-authenticated-user@city.ac.uk',
            password: 'testinglecturer',
        },
        expected: { message: 'User is not verified' }
    },
    {
        method: 'post',
        url: '/authenticate-user',
        payload: {
            email: 'individualunpaidlecturer@city.ac.uk',
            password: 'testinglecturer',
        },
        expected: { message: "Sorry, you haven't made your last payment. Please contact Quodl" }
    },
    {
        method: 'post',
        url: '/authenticate-user',
        payload: {
            email: 'trialexpired@city.ac.uk',
            password: 'testinglecturer',
        },
        expected: { message: 'Sorry, your trial has expired, please contact Quodl to upgrade your free account' }
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
            username: 'testingstudent',
            group_code: null
        },
        expected: {
            email: 'sohilpandya1990@gmail.com',
            expiry_code: null,
            is_lecturer: false,
            is_verified: true,
            reset_password_code: null,
            user_id: 38,
            username: 'testingstudent',
            group_code: null,
            verification_code: null,
            is_super_admin: false,
            trial_expiry_time: null,
            account_type: null,
            paid: null
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
        expected: { email: 'lecturer@city.ac.uk', expiry_code: null, is_lecturer: true, is_super_admin: true, is_verified: true, reset_password_code: null, user_id: 2, username: 'lecturer', group_code: null, verification_code: null, trial_expiry_time: null }
    },
    {
        method: 'get',
        url: '/super-admin',
        expected: {
            lecturers: [
                { user_id: 28, email: 'authenticate-user@city.ac.uk', is_lecturer: true, username: 'lecturer' },
                { user_id: 36, email: 'individualpaidlecturer@city.ac.uk', is_lecturer: true, username: 'lecturer' },
                { user_id: 37, email: 'individualunpaidlecturer@city.ac.uk', is_lecturer: true, username: 'lecturer' },
                { user_id: 2, email: 'lecturer@city.ac.uk', is_lecturer: true, username: 'lecturer' },
                { user_id: 29, email: 'not-authenticated-user@city.ac.uk', is_lecturer: true, username: 'lecturer' },
                { user_id: 34, email: 'trialexpired@city.ac.uk', is_lecturer: true, username: 'lecturer' },
                { user_id: 35, email: 'trialneverexpires@city.ac.uk', is_lecturer: true, username: 'lecturer' },
                { user_id: 27, email: 'verification@email.com', is_lecturer: true, username: 'lecturer-test-verify' },
                { user_id: 25, email: 'verify-lecturer@city.ac.uk', is_lecturer: true, username: 'verify-lecturer' }
            ],
             students: [
                 { user_id: 11, email: 'apu@simpsons.com', is_lecturer: false, username: 'Apu' },
                 { user_id: 8, email: 'bart@simpsons.com', is_lecturer: false, username: 'Bart' },
                 { user_id: 19, email: 'comicbookguy@simpsons.com', is_lecturer: false, username: 'Comic Book Guy' },
                 { user_id: 23, email: 'drnick@simpsons.com', is_lecturer: false, username: 'Dr Nick' },
                 { user_id: 32, email: 'expiredpassword@city.ac.uk', is_lecturer: false, username: 'expired-password' },
                 { user_id: 5, email: 'homer@simpsons.com', is_lecturer: false, username: 'Homer' },
                 { user_id: 20, email: 'krusty@simpsons.com', is_lecturer: false, username: 'Krusty' },
                 { user_id: 7, email: 'lisa@simpsons.com', is_lecturer: false, username: 'Lisa' },
                 { user_id: 9, email: 'maggie@simpsons.com', is_lecturer: false, username: 'Maggie' },
                 { user_id: 6, email: 'marge@simpsons.com', is_lecturer: false, username: 'Marge' },
                 { user_id: 15, email: 'milhouse@simpsons.com', is_lecturer: false, username: 'Milhouse' },
                 { user_id: 4, email: 'mina@city.ac.uk', is_lecturer: false, username: 'Mina' },
                 { user_id: 13, email: 'mrburns@simpsons.com', is_lecturer: false, username: 'Mr Burns' },
                 { user_id: 10, email: 'ned@simpsons.com', is_lecturer: false, username: 'Ned' },
                 { user_id: 16, email: 'nelson@simpsons.com', is_lecturer: false, username: 'Nelson' },
                 { user_id: 17, email: 'patty@simpsons.com', is_lecturer: false, username: 'Patty' },
                 { user_id: 24, email: 'principalskinner@simpsons.com', is_lecturer: false, username: 'Principal Skinner' },
                 { user_id: 33, email: 'reset-password-endpoint@city.ac.uk', is_lecturer: false, username: 'reset-password' },
                 { user_id: 14, email: 'revlovejoy@simpsons.com', is_lecturer: false, username: 'Rev Lovejoy' },
                 { user_id: 18, email: 'selma@simpsons.com', is_lecturer: false, username: 'Selma' },
                 { user_id: 21, email: 'sideshowbob@simpsons.com', is_lecturer: false, username: 'Sideshow Bob' },
                 { user_id: 22, email: 'sideshowmel@simpsons.com', is_lecturer: false, username: 'Sideshow Mel' },
                 { user_id: 12, email: 'smithers@simpsons.com', is_lecturer: false, username: 'Smithers' },
                 { user_id: 3, email: 'sohil@city.ac.uk', is_lecturer: false, username: 'Sohil' },
                 { user_id: 30, email: 'sohilpandya@foundersandcoders.com', is_lecturer: false, username: 'reset-password-student' },
                 { user_id: 1, email: 'student@city.ac.uk', is_lecturer: false, username: 'student' },
                 { user_id: 31, email: 'validexpiry@city.ac.uk', is_lecturer: false, username: 'valid-password-expiry' },
                 { user_id: 26, email: 'verify-student@city.ac.uk', is_lecturer: false, username: 'verify-student' }
             ],
         clients: [
             { account_management_id: 1, name: 'jsalmon', email: 'jessica@city.ac.uk', institution: 'FAC', department: 'Ten', account_type: 'group admin', paid: true, code: 'xyz' },
             { account_management_id: 2, name: 'spandya', email: 'sohil@caf.ac.uk', institution: '', department: '', account_type: 'individual lecturer', paid: false, code: 'abc' },
             { account_management_id: 3, name: 'individualpaidlecturer', email: 'individualpaidlecturer@city.ac.uk', institution: '', department: '', account_type: 'individual lecturer', paid: true, code: null },
             { account_management_id: 4, name: 'individualunpaidlecturer', email: 'individualunpaidlecturer@city.ac.uk', institution: '', department: '', account_type: 'individual lecturer', paid: false, code: null }
         ]
        }
    },
    {
        method: 'post',
        url: '/super-admin/client',
        payload: {
            name: 'name',
            email: 'email@email.com',
            institution: 'institution',
            department: 'department',
            accountType: 'group admin',
            paid: true,
            isEditingClient: false,
        },
        expected: { message: 'data has been successfully posted and user has been sent the email.' }
    },
    {
        method: 'post',
        url: '/super-admin/client',
        payload: {
            name: 'name',
            email: 'email@email.com',
            institution: 'institution',
            department: 'department',
            accountType: 'individual lecturer',
            paid: true,
            isEditingClient: false,
        },
        expected: { message: 'data has been successfully posted and user has been sent the email.' }
    },
    {
        method: 'post',
        url: '/super-admin/client',
        payload: {
            name: 'name',
            email: 'individualpaidlecturer@city.ac.uk',
            institution: 'institution',
            department: 'department',
            accountType: 'individual lecturer',
            paid: false,
            isEditingClient: false,
        },
        expected: { message: 'data has been successfully posted and user has been sent the email.' }
    },
    {
        method: 'post',
        url: '/super-admin/client',
        payload: {
            name: 'name',
            email: 'email@email.com',
            institution: 'institution',
            department: 'department',
            accountType: 'individual lecturer',
            paid: true,
            isEditingClient: true,
        },
        expected: { message: 'user has been updated, but no email has been sent' }
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
        .then(() => simulateAuth('lecturer@city.ac.uk'))
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
        expected: { module_id: 'TEST', name: 'test module', medals: { medal_name: ['bronze', 'silver', 'gold'], condition: [39, 69] }, uses_trophies: true, trophies_awarded: { first_quiz: false, high_score: false, participation: false, overall_score: false }, trophies: { trophy_name: ['first_quiz', 'high_score', 'overall_score', 'participation'], condition: [1, 100, 2, 2] } }
    },
    {
        method: 'get',
        url: '/get-user-details',
        expected: { email: 'student@city.ac.uk', expiry_code: null, is_lecturer: false, is_super_admin: false, is_verified: true, reset_password_code: null, user_id: 1, username: 'student', group_code: null, verification_code: null, trial_expiry_time: null }
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
        .then(() => simulateAuthStudents('lecturer@city.ac.uk'))
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
