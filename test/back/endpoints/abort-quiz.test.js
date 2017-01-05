const test = require('tape');
const server = require('../../utils/initServer.js');
const simulateAuth = require('../../utils/simulateAuth.js')(server);
const pool = require('../../../server/lib/dbClient.js');
const redisCli = server.app.redisCli;
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`abort-quiz` endpoint works', (t) => {

    t.plan(2);
    initDb()
    .then(() => simulateAuth())
    .then((token) => {
        const quiz_id = 8;

        const options = {
            method: 'GET',
            url: `/abort-quiz?quiz_id=${quiz_id}`,
            headers: { Authorization: token }
        };

        server.inject(options, (response) => {

            t.equal(response.statusCode, 200, '200 status code');
            t.ok(response.result, 'Get data back');
        });
    });
});

test('`abort-quiz` endpoint returns 401 if authorization header isn\'t provided', (t) => {

    t.plan(1);

    server.inject('/abort-quiz', (response) => {
        t.equal(response.statusCode, 401, '401 status code');
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});


