import test from 'tape';
import { server } from '../../utils/init';


test('`get-quiz-result` endpoint returns error if quiz_id is undefined', (t) => {

    t.plan(1);

    server.inject('/get-quiz-result', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`get-quiz-result` endpoint works when is_last_quiz is false', (t) => {

    t.plan(1);

    const user_id = 1,
        module_id = 'TEST',
        quiz_id = 1;
    server.inject(`/get-quiz-result?user_id=${user_id}&module_id=${module_id}&quiz_id=${quiz_id}`, (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});
