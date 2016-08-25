import test from 'tape';
import { server } from '../../utils/init';


test('`save-student-response` endpoint works', (t) => {
    t.plan(2);

    const options = {
        method: 'POST',
        url: '/save-student-response',
        payload: {
            user_id: 1,
            quiz_id: 1,
            question_id: 1,
            response: 'a'
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});

test('`save-student-response` endpoint works again', (t) => {
    t.plan(2);

    const options = {
        method: 'POST',
        url: '/save-student-response',
        payload: {
            user_id: 1,
            quiz_id: 1,
            question_id: 5,
            response: 'b'
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});
