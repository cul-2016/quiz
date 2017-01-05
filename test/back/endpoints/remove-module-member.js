const test = require('tape');
const { server } = require('../../utils/init');

test('`remove-module-member` endpoint returns error if module_id is undefined', (t) => {

    t.plan(1);

    server.inject('/remove-module-member?user_id=1', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});


test('`remove-module-member` endpoint returns error if user_id is undefined', (t) => {

    t.plan(1);

    server.inject('/remove-module-member?module_id=TEST', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});


test('`remove-module-member` endpoint works', (t) => {

    t.plan(1);

    server.inject('/remove-module-member?module_id=TEST&user_id=2', (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});
