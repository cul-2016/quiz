const test = require('tape');
const { server } = require('../../utils/init');

test('`save-student-response` endpoint works', (t) => {
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

test('`save-student-response` endpoint works again', (t) => {
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
