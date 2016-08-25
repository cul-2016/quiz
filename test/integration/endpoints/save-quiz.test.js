import test from 'tape';
import { server, testClient } from '../../utils/init';
import { questions as questions } from '../../utils/data-fixtures';


test('`save-quiz` endpoint works', (t) => {
    t.plan(2);

    const options = {
        method: 'POST',
        url: '/save-quiz',
        payload: {
            module_id: 'TEST',
            quizName: 'Test Quiz',
            questions
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});

test('deleting recently added quiz from database', (t) => {

    testClient.connect((error, client, done) => {
        if (error) {
            console.error(error, 'error from deleting lecturer from the database');
        }
        client.query('DELETE FROM quizzes WHERE quiz_id = $1', [3]);
        done();
        t.end();
    });
});
