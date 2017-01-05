const test = require('tape');
const { server } = require('../../utils/init');

test('`get-feedback` endpoint works', (t) => {

    t.plan(2);
    const user_id = 1;
    const module_id = 'TEST';

    const options = {
        method: 'GET',
        url: `/get-feedback?user_id=${user_id}&module_id=${module_id}`
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});


test('`get-feedback` endpoint returns error if user_id or module_id is undefined', (t) => {

    t.plan(1);

    server.inject('/get-feedback', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});
