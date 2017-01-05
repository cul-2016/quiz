const test = require('tape');
const { server } = require('../../utils/init');

test('`get-quiz-questions` endpoint returns error if quiz_id is undefined', (t) => {

    t.plan(1);

    server.inject('/get-quiz-questions', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`get-quiz-questions` endpoint works', (t) => {

    t.plan(1);

    server.inject('/get-quiz-questions?quiz_id=1', (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});
