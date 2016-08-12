import test from 'tape';
import { server } from '../../utils/init';


test('`get-quiz-review` endpoint returns error if quiz_id is undefined', (t) => {

    t.plan(1);

    server.inject('/get-quiz-review', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`get-quiz-review` endpoint works', (t) => {

    t.plan(1);

    server.inject('/get-quiz-review?quiz_id=1', (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});
