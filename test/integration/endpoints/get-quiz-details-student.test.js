import test from 'tape';
import { server } from '../../utils/init';


test('`get-quiz-details-student` endpoint returns error if quiz_id or user_id are undefined', (t) => {

    t.plan(3);

    server.inject('/get-quiz-details-student?user_id=1', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });

    server.inject('/get-quiz-details-student?quiz_id=1', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });

    server.inject('/get-quiz-details-student', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`get-quiz-details-student` endpoint works', (t) => {

    t.plan(1);

    server.inject('/get-quiz-details-student?quiz_id=1&user_id=1', (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});
