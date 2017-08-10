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
        expected: { lecturers: [ { user_id: 2, email: 'lecturer@city.ac.uk', password: '$2a$10$3xJ58ADV1YvwSiaRXBK6FOsy/wIMF3/p6nJzDid3qesRpmSMhXy8G', is_lecturer: true, is_super_admin: true, username: 'lecturer', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 25, email: 'verify-lecturer@city.ac.uk', password: '$2a$10$3xJ58ADV1YvwSiaRXBK6FOsy/wIMF3/p6nJzDid3qesRpmSMhXy8G', is_lecturer: true, is_super_admin: false, username: 'verify-lecturer', is_verified: false, verification_code: 'testing-verification-code', reset_password_code: null, expiry_code: null }, { user_id: 27, email: 'verification@email.com', password: '$2a$10$3xJ58ADV1YvwSiaRXBK6FOsy/wIMF3/p6nJzDid3qesRpmSMhXy8G', is_lecturer: true, is_super_admin: false, username: 'lecturer-test-verify', is_verified: false, verification_code: 'testing-verification-code-lecturer', reset_password_code: null, expiry_code: null }, { user_id: 28, email: 'authenticate-user@city.ac.uk', password: '$2a$10$3xJ58ADV1YvwSiaRXBK6FOsy/wIMF3/p6nJzDid3qesRpmSMhXy8G', is_lecturer: true, is_super_admin: false, username: 'lecturer', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 29, email: 'not-authenticated-user@city.ac.uk', password: '$2a$10$3xJ58ADV1YvwSiaRXBK6FOsy/wIMF3/p6nJzDid3qesRpmSMhXy8G', is_lecturer: true, is_super_admin: false, username: 'lecturer', is_verified: false, verification_code: 'verification-code-for-not-authenticated-user', reset_password_code: null, expiry_code: null } ], students: [ { user_id: 1, email: 'student@city.ac.uk', password: '$2a$10$UnvUuW91Jh6.zWQi3G/2J.HLDTomSqJHxvBC.TYx/Bj8HZa.AAm4K', is_lecturer: false, is_super_admin: false, username: 'student', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 3, email: 'sohil@city.ac.uk', password: '$2a$10$UnvUuW91Jh6.zWQi3G/2J.HLDTomSqJHxvBC.TYx/Bj8HZa.AAm4K', is_lecturer: false, is_super_admin: false, username: 'Sohil', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 4, email: 'mina@city.ac.uk', password: '$2a$10$UnvUuW91Jh6.zWQi3G/2J.HLDTomSqJHxvBC.TYx/Bj8HZa.AAm4K', is_lecturer: false, is_super_admin: false, username: 'Mina', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 5, email: 'homer@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Homer', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 6, email: 'marge@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Marge', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 7, email: 'lisa@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Lisa', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 8, email: 'bart@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Bart', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 9, email: 'maggie@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Maggie', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 10, email: 'ned@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Ned', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 11, email: 'apu@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Apu', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 12, email: 'smithers@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Smithers', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 13, email: 'mrburns@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Mr Burns', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 14, email: 'revlovejoy@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Rev Lovejoy', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 15, email: 'milhouse@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Milhouse', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 16, email: 'nelson@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Nelson', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 17, email: 'patty@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Patty', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 18, email: 'selma@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Selma', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 19, email: 'comicbookguy@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Comic Book Guy', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 20, email: 'krusty@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Krusty', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 21, email: 'sideshowbob@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Sideshow Bob', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 22, email: 'sideshowmel@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Sideshow Mel', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 23, email: 'drnick@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Dr Nick', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 24, email: 'principalskinner@simpsons.com', password: '$2a$10$tfPmiBxwRuQkGJXEchXd7ORY3JyU7aVF9zhvl2itF8HnJas4k9c6K', is_lecturer: false, is_super_admin: false, username: 'Principal Skinner', is_verified: true, verification_code: null, reset_password_code: null, expiry_code: null }, { user_id: 26, email: 'verify-student@city.ac.uk', password: '$2a$10$UnvUuW91Jh6.zWQi3G/2J.HLDTomSqJHxvBC.TYx/Bj8HZa.AAm4K', is_lecturer: false, is_super_admin: false, username: 'verify-student', is_verified: true, verification_code: 'reset-verification-code', reset_password_code: null, expiry_code: null }, { user_id: 30, email: 'sohilpandya@foundersandcoders.com', password: '$2a$10$UnvUuW91Jh6.zWQi3G/2J.HLDTomSqJHxvBC.TYx/Bj8HZa.AAm4K', is_lecturer: false, is_super_admin: false, username: 'reset-password-student', is_verified: true, verification_code: null, reset_password_code: 'reset-password-code-does not matter', expiry_code: '1490893097275' }, { user_id: 31, email: 'validexpiry@city.ac.uk', password: '$2a$10$UnvUuW91Jh6.zWQi3G/2J.HLDTomSqJHxvBC.TYx/Bj8HZa.AAm4K', is_lecturer: false, is_super_admin: false, username: 'valid-password-expiry', is_verified: true, verification_code: null, reset_password_code: 'reset-password-code', expiry_code: '1522430596157' }, { user_id: 32, email: 'expiredpassword@city.ac.uk', password: '$2a$10$UnvUuW91Jh6.zWQi3G/2J.HLDTomSqJHxvBC.TYx/Bj8HZa.AAm4K', is_lecturer: false, is_super_admin: false, username: 'expired-password', is_verified: true, verification_code: null, reset_password_code: 'reset-password-code-2', expiry_code: '1482166876770' }, { user_id: 33, email: 'reset-password-endpoint@city.ac.uk', password: '$2a$10$UnvUuW91Jh6.zWQi3G/2J.HLDTomSqJHxvBC.TYx/Bj8HZa.AAm4K', is_lecturer: false, is_super_admin: false, username: 'reset-password', is_verified: true, verification_code: null, reset_password_code: 'reset-password-code-endpoint', expiry_code: '1741536250477' } ] }
    }
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
        expected: { medals: { condition: [39, 69], medal_name: ['bronze', 'silver', 'gold'] }, module_id: 'TEST', name: 'test module', trophies_awarded: { first_quiz: false, high_score: false, overall_average: false, participation: false } }
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
