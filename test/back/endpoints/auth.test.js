const test = require('tape');
const server = require('../../../server/server.js');
const simulateAuth = require('../../utils/simulateAuth.js')(server);
const simulateAuthStudents = require('../../utils/simulateAuthStudents.js')(server);
const pool = require('../../utils/dbClient.js');
const redisCli = server.app.redisCli;
const initDb = require('../../utils/initDb.js')(pool, redisCli);

const sinon = require('sinon');
const sendemail = require('sendemail');

let email;

const {
    questions,
    updateQuizOptionsPayload,
    newModule
} = require('../../utils/data-fixtures.js');

const lecturerCreds = { email: 'authenticate-user@city.ac.uk', password: 'testinglecturer' };
const verificationCreds = { email: 'verification@email.com', password: 'testinglecturer' };
const franzCreds = { email: 'franzmoro@hotmail.com', password: 'testinglecturer', is_lecturer: true };

// authentication checks for Lecturers
[
// module endpoint tests
    { url: '/add-new-module', method: 'post', payload: newModule },
    { url: '/get-module-members?module_id=TEST' },
    { url: '/get-module?module_id=TEST&is_lecturer=true' },
    { url: '/get-module-list?user_id=2&is_lecturer=true' },
    { url: '/get-module-list?user_id=1&is_lecturer=false' },
    { url: '/get-module?module_id=TEST' },
    { url: '/get-module-list' },
    { url: '/remove-module-member?user_id=1&module_id=TEST' },
    { url: '/validate-module?module_id=TEST' },
    { url: '/join-module?module_id=FAC8' },
    { url: '/get-leaderboard?module_id=TEST' },
    { url: '/get-feedback?module_id=TEST' },
    { url: '/get-student-history?module_id=TEST&user_id=1' },

// quiz tests
    { url: '/abort-quiz?quiz_id=8' },
    { url: '/save-quiz', method: 'post', payload: { module_id: 'TEST', name: 'Brand New Quiz', isSurvey: false, questions } },
    { url: '/save-quiz', method: 'post', payload: { module_id: 'TEST', name: 'Brand New Survey', isSurvey: true, questions } },
    { url: '/save-quiz', method: 'post', payload: { module_id: 'TEST', name: 'Brand New Quiz', questions } },
    { url: '/save-student-response', method: 'post', payload: { user_id: 1, id: 1, isSurvey: true, question_id: 3, response: 'a' } },
    { url: '/save-student-response', method: 'post', payload: { user_id: 5, id: 1, isSurvey: false, question_id: 36, response: 'a' } },
    { url: '/get-quiz-questions?quiz_id=1' },
    { url: '/get-quiz-questions?survey_id=1' },
    { url: '/end-quiz', method: 'post', payload: { id: 8, isSurvey: false } },
    { url: '/end-quiz', method: 'post', payload: { id: 1, isSurvey: true } },
    { url: '/get-review?id=1&isSurvey=false' },
    { url: '/get-review?id=1&isSurvey=true' },
    { url: '/get-quiz-members?id=1&isSurvey=true' },
    { url: '/get-quiz-members?id=1&isSurvey=false' },
    { url: '/edit-score?quiz_id=1&score=2&user_id=1' },
    { url: '/get-quiz-details?quiz_id=1' },
    { url: '/get-quiz-details?survey_id=1' },
    { url: '/update-quiz', method: 'post', payload: updateQuizOptionsPayload },
    { url: '/get-quiz-details-student?quiz_id=1' },

// user tests
    { url: '/get-user-details' }
].forEach((endpoint) => {
    test(endpoint.url + ' endpoint returns 401 due to user_id not defined in decoded token', (t) => {
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
        .then(() => {
            const faketoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2RldGFpbHMiOnsiZW1haWwiOiJsZWN0dXJlckBjaXR5LmFjLnVrIiwiaXNfbGVjdHVyZXIiOnRydWUsInVzZXJuYW1lIjoibGVjdHVyZXIiLCJpc192ZXJpZmllZCI6dHJ1ZSwidmVyaWZpY2F0aW9uX2NvZGUiOm51bGwsInJlc2V0X3Bhc3N3b3JkX2NvZGUiOm51bGwsImV4cGlyeV9jb2RlIjpudWxsfSwidWlkIjoiNTQ3NmYyMzAtZDQzNy0xMWU2LThmMDYtOGRmNTk1ZjYyYmIzIiwiaWF0IjoxNDgzNzI0NDc4fQ.iNGYZZtYuBLo8Qbf1NnApt4qNMoczpWw991yIzdraxE';

            const options = {
                method: endpoint.method || 'get',
                url: endpoint.url,
                payload: endpoint.payload,
                headers: { Authorization: faketoken }
            };

            return server.inject(options);
        })
        .then((response) => {
            email.restore();
            t.equal(response.statusCode, 401, '401 status code for ' + endpoint.url);
        })
        .catch((err) => {
            email.restore();
            t.error(err);
        });
    });

    test(endpoint.url + ' endpoint returns 401 due to fake token', (t) => {
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
        .then(() => {
            const faketoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2RldGFpbHMiOnsidXNlcl9pZCI6MiwiZW1haWwiOiJsZWN0dXJlckBjaXR5LmFjLnVrIiwiaXNfbGVjdHVyZXIiOnRydWUsInVzZXJuYW1lIjoibGVjdHVyZXIiLCJpc192ZXJpZmllZCI6dHJ1ZSwidmVyaWZpY2F0aW9uX2NvZGUiOm51bGwsInJlc2V0X3Bhc3N3b3JkX2NvZGUiOm51bGwsImV4cGlyeV9jb2RlIjpudWxsfSwidWlkIjoiODhiZjI2ZDAtZDQzNi0xMWU2LWFkYjAtZWQxZmMzc29oaWwiLCJpYXQiOjE0ODM3MjQxMzZ9.eIUlEMiXltreNapzBhDwbQjfF0YwWPqFE5qCyxS51aE';

            const options = {
                method: endpoint.method || 'get',
                url: endpoint.url,
                payload: endpoint.payload,
                headers: { Authorization: faketoken }
            };

            return server.inject(options);
        })
        .then((response) => {
            email.restore();
            t.equal(response.statusCode, 401, '401 status code for ' + endpoint.url);
        })
        .catch((err) => {
            email.restore();
            t.error(err);
        });
    });

    test(endpoint.url + ' authentication works', (t) => {
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
                method: endpoint.method || 'get',
                url: endpoint.url,
                payload: endpoint.payload,
                headers: { Authorization: token, cookie: 'token=' + token },
            };

            return server.inject(options);
        })
        .then((response) => {
            if (response.statusCode === 400) {
                console.log(response);
            }
            email.restore();
            t.equal(response.statusCode, 200, '200 status code');
        })
        .catch((err) => {
            email.restore();
            t.error(err);
        });
    });

    test(endpoint.url + ' endpoint returns 401 if no Authorization header is present', (t) => {
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
        .then(() => {

            const options = {
                method: endpoint.method || 'get',
                url: endpoint.url,
                payload: endpoint.payload,
            };

            return server.inject(options);
        })
        .then((response) => {
            email.restore();
            t.equal(response.statusCode, 401, '401 status code for ' + endpoint.url);
        })
        .catch((err) => {
            email.restore();
            t.error(err);
        });
    });
});


// authentication checks for Students
[
    { url: '/get-quiz-result?module_id=TEST&quiz_id=1' }
].forEach((endpoint) => {
    test(endpoint.url + ' endpoint returns 401 due to user_id not defined in decoded token', (t) => {
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
        .then(() => {
            const faketoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2RldGFpbHMiOnsiZW1haWwiOiJsZWN0dXJlckBjaXR5LmFjLnVrIiwiaXNfbGVjdHVyZXIiOnRydWUsInVzZXJuYW1lIjoibGVjdHVyZXIiLCJpc192ZXJpZmllZCI6dHJ1ZSwidmVyaWZpY2F0aW9uX2NvZGUiOm51bGwsInJlc2V0X3Bhc3N3b3JkX2NvZGUiOm51bGwsImV4cGlyeV9jb2RlIjpudWxsfSwidWlkIjoiNTQ3NmYyMzAtZDQzNy0xMWU2LThmMDYtOGRmNTk1ZjYyYmIzIiwiaWF0IjoxNDgzNzI0NDc4fQ.iNGYZZtYuBLo8Qbf1NnApt4qNMoczpWw991yIzdraxE';

            const options = {
                method: endpoint.method || 'get',
                url: endpoint.url,
                payload: endpoint.payload,
                headers: { Authorization: faketoken }
            };

            return server.inject(options);
        })
        .then((response) => {
            email.restore();
            t.equal(response.statusCode, 401, '401 status code for ' + endpoint.url);
        })
        .catch((err) => {
            email.restore();
            t.error(err);
        });
    });

    test(endpoint.url + ' endpoint returns 401 due to fake token', (t) => {
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
        .then(() => {
            const faketoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2RldGFpbHMiOnsidXNlcl9pZCI6MiwiZW1haWwiOiJsZWN0dXJlckBjaXR5LmFjLnVrIiwiaXNfbGVjdHVyZXIiOnRydWUsInVzZXJuYW1lIjoibGVjdHVyZXIiLCJpc192ZXJpZmllZCI6dHJ1ZSwidmVyaWZpY2F0aW9uX2NvZGUiOm51bGwsInJlc2V0X3Bhc3N3b3JkX2NvZGUiOm51bGwsImV4cGlyeV9jb2RlIjpudWxsfSwidWlkIjoiODhiZjI2ZDAtZDQzNi0xMWU2LWFkYjAtZWQxZmMzc29oaWwiLCJpYXQiOjE0ODM3MjQxMzZ9.eIUlEMiXltreNapzBhDwbQjfF0YwWPqFE5qCyxS51aE';

            const options = {
                method: endpoint.method || 'get',
                url: endpoint.url,
                payload: endpoint.payload,
                headers: { Authorization: faketoken }
            };

            return server.inject(options);
        })
        .then((response) => {
            email.restore();
            t.equal(response.statusCode, 401, '401 status code for ' + endpoint.url);
        })
        .catch((err) => {
            email.restore();
            t.error(err);
        });
    });

    test(endpoint.url + ' authentication works', (t) => {
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
                method: endpoint.method || 'get',
                url: endpoint.url,
                payload: endpoint.payload,
                headers: { Authorization: token, cookie: 'token=' + token },
            };

            return server.inject(options);
        })
        .then((response) => {
            email.restore();
            t.equal(response.statusCode, 200, '200 status code');
        })
        .catch((err) => {
            email.restore();
            t.error(err);
        });
    });

    test(endpoint.url + ' endpoint returns 401 if no Authorization header is present', (t) => {
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
        .then(() => {
            const options = {
                method: endpoint.method || 'get',
                url: endpoint.url,
                payload: endpoint.payload,
            };

            return server.inject(options);
        })
        .then((response) => {
            email.restore();
            t.equal(response.statusCode, 401, '401 status code for ' + endpoint.url);
        })
        .catch((err) => {
            email.restore();
            t.error(err);
        });
    });
});


// no auth endpoints
[
    { url: '/' },
    { url: '/authenticate-user', method: 'post', payload: lecturerCreds },
    { url: '/save-user', method: 'post', payload: franzCreds },
    { url: '/submit-new-password', method: 'post', payload: { code: 'reset-password-code-2', password: 'testing' } },
    { url: '/reset-password-request', method: 'post', payload: { email: 'sohilpandya@foundersandcoders.com' } },
    { url: '/verification?code=testing-verification-code-lecturer', method: 'get', payload: verificationCreds },
// authenticate-user plugin
    { url: '/logout', method: 'post' },
].forEach((endpoint) => {
    test('`' + endpoint.url + '` endpoint returns true when password matches', (t) => {
        t.plan(1);

        const options = endpoint;

        email = sinon.stub(
            sendemail,
            'email',
            (name, person, cb) => cb(null)
        );

        initDb()
        .then(() => server.inject(options))
        .then((response) => {
            email.restore();
            if (response.statusCode === 302) {
                t.equal(response.statusCode, 302, endpoint.url + ' doesnt require authentication');
                return;
            }
            t.equal(response.statusCode, 200, endpoint.url + ' doesnt require authentication');
        })
        .catch((err) => {
            email.restore();
            t.error(err);
        });
    });

});

[
    { url: '/logout', method: 'POST' },
].forEach((endpoint) => {
    test(endpoint.url + ' with credentials', (t) => {
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
                    method: endpoint.method || 'get',
                    url: endpoint.url,
                    payload: endpoint.payload,
                    headers: { Authorization: token, cookie: 'token=' + token },
                };

                return server.inject(options);
            })
            .then((response) => {
                email.restore();
                t.equal(response.statusCode, 200, '200 status code');
            })
            .catch((err) => {
                email.restore();
                t.error(err);
            });
    });

    test(endpoint.url + ' without credentials', (t) => {
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
            .then(() => {
                const options = {
                    method: endpoint.method || 'get',
                    url: endpoint.url,
                    payload: endpoint.payload,
                };

                return server.inject(options);
            })
            .then((response) => {
                email.restore();
                t.equal(response.statusCode, 200, '200 status code');
            })
            .catch((err) => {
                email.restore();
                t.error(err);
            });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
