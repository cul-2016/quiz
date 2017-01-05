const test = require('tape');
const { server, testClient } = require('../../utils/init');

test('`abort-quiz` endpoint works', (t) => {

    t.plan(2);
    const quiz_id = 8;

    const options = {
        method: 'GET',
        url: `/abort-quiz?quiz_id=${quiz_id}`
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});

test('`abort-quiz` endpoint returns error if quiz_id is undefined', (t) => {

    t.plan(1);

    server.inject('/abort-quiz', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});


test('---- adding the response back to the db that has been deleted ------', (t) => {

    testClient.connect((error, client, done) => {
        if (error) {
            console.error(error, 'error from adding response back to db');
        }
        client.query('INSERT INTO responses (user_id, quiz_id, question_id, response) VALUES (24, 8, 31, b)');
        done();
        t.end();
    });
});
