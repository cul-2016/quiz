const test = require('tape');
const { server, testClient } = require('../../utils/init');
const { questions } = require('../../utils/data-fixtures');

test('`save-quiz` endpoint works', (t) => {
    t.plan(2);

    const options = {
        method: 'POST',
        url: '/save-quiz',
        payload: {
            module_id: 'TEST',
            quizName: 'Brand New Quiz',
            questions
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');

        testClient.connect((error, client, done) => {
            if (error) {
                console.error(error);
            }
            client.query('DELETE FROM quizzes WHERE module_id = $1 AND name = $2', ['TEST', 'Brand New Quiz']);
            done();
        });
    });
});
