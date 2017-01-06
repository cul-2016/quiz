const test = require('tape');
const server = require('../../../server/server.js');
const simulateAuth = require('../../utils/simulateAuth.js')(server);
const pool = require('../../utils/dbClient.js');
const redisCli = server.app.redisCli;
const initDb = require('../../utils/initDb.js')(pool, redisCli);

const {
  questions,
  updateQuizOptionsPayload
} = require('../../utils/data-fixtures.js');

[
    { url: '/abort-quiz?quiz_id=8' },
    { url: '/save-quiz', method: 'post', payload: {
        module_id: 'TEST',
        quizName: 'Brand New Quiz',
        questions
    } },
    { url: '/get-quiz-questions?quiz_id=1' },
    { url: '/end-quiz', method: 'post', payload: { quiz_id: 8 } },
    { url: '/get-quiz-result?user_id=1&module_id=TEST&quiz_id=1' },
    { url: '/get-quiz-review?quiz_id=1' },
    { url: '/get-quiz-members?quiz_id=1' },
    { url: '/edit-score?quiz_id=1&user_id=3&score=2' },
    { url: '/get-quiz-details?quiz_id=1' },
    { url: '/update-quiz', method: 'post', payload: updateQuizOptionsPayload }
].forEach((endpoint) => {
    test(endpoint.url + ' endpoint works', (t) => {
        t.plan(1);

        initDb()
        .then(() => simulateAuth())
        .then((token) => {
            const options = {
                method: endpoint.method || 'get',
                url: endpoint.url,
                payload: endpoint.payload,
                headers: { Authorization: token }
            };

            return server.inject(options);
        })
        .then((response) => {
            t.equal(response.statusCode, 200, '200 status code');
        });
    });

    test(endpoint.url + ' endpoint returns 401 due to fake token', (t) => {
        t.plan(1);

        initDb()
        .then(() => simulateAuth())
        .then((token) => {
            const fakeToken = token.substring(token.length - 5);
            const options = {
                method: endpoint.method || 'get',
                url: endpoint.url,
                payload: endpoint.payload,
                headers: { Authorization: fakeToken }
            };

            return server.inject(options);
        })
        .then((response) => {
            t.equal(response.statusCode, 401, '401 status code for ' + endpoint.url);
        });
    });



    test(endpoint.url + ' endpoint returns 401 if authorization header isn\'t provided', (t) => {

        t.plan(1);

        const options = {
            method: endpoint.method || 'get',
            url: endpoint.url,
            payload: endpoint.payload
        };

        server.inject('/abort-quiz')
        .then((response) => {
            t.equal(response.statusCode, 401, '401 status code');
        });
    });

});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});

