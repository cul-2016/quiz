import test from 'tape';
import { server, testClient } from '../../utils/init';
import { questions } from '../../utils/data-fixtures';

test('`save-quiz` endpoint works (quiz)', (t) => {
    t.plan(2);

    const options = {
        method: 'POST',
        url: '/save-quiz',
        payload: {
            module_id: 'TEST',
            name: 'Brand New Quiz',
            isSurvey: false,
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

test('`save-quiz` endpoint works for surveys, even with correct_answer fields', (t) => {
    t.plan(2);

    const name = 'Brand New Survey';
    const options = {
        method: 'POST',
        url: '/save-quiz',
        payload: {
            module_id: 'TEST',
            isSurvey: true,
            name,
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
            client.query('DELETE FROM surveys WHERE module_id = $1 AND name = $2', ['TEST', name]);
            done();
        });
    });
});
