const test = require('tape');
const { server } = require('../../utils/init');

test('`get-quiz-members` endpoint returns error if quiz_id is undefined', (t) => {

    t.plan(1);

    server.inject('/get-quiz-members', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`get-quiz-members` endpoint works', (t) => {

    t.plan(1);

    server.inject('/get-quiz-members?quiz_id=1', (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});
