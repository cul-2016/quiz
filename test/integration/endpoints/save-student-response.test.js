import test from 'tape';
import { server } from '../../utils/init';


test('`save-student-response` endpoint works (quiz)', (t) => {
    t.plan(2);

    const options = {
        method: 'POST',
        url: '/save-student-response',
        payload: {
            user_id: 1,
            quiz_id: 2,
            question_id: 3,
            response: 'd'
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});

test('`save-student-response` endpoint works again (quiz)', (t) => {
    t.plan(2);

    const options = {
        method: 'POST',
        url: '/save-student-response',
        payload: {
            user_id: 1,
            quiz_id: 2,
            question_id: 3,
            response: 'b'
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});

test('`save-student-response` endpoint works (survey)', (t) => {
    t.plan(2);

    const options = {
        method: 'POST',
        url: '/save-student-response',
        payload: {
            user_id: 5,
            survey_id: 3,
            question_id: 36,
            response: 'a'
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});

test('`save-student-response` endpoint missing params (no id)', (t) => {
    t.plan(1);

    const options = {
        method: 'POST',
        url: '/save-student-response',
        payload: {
            user_id: 5,
            question_id: 34,
            response: 'c'
        }
    };

    server.inject(options, (response) => {
        t.equal(response.statusCode, 500, 'provides error when there are no params');
    });
});
