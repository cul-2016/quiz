const test = require('tape');
const { server } = require('../../utils/init');

test('`join-module` endpoint returns error if user_id is undefined', (t) => {

    t.plan(1);

    server.inject('/join-module?module_id=TEST', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});


test('`join-module` endpoint returns error if module_id is undefined', (t) => {

    t.plan(1);

    server.inject('/join-module?user_id=2', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});


test('`join-module` endpoint works', (t) => {

    t.plan(1);

    server.inject('/join-module?module_id=FAC8&user_id=7', (response) => {

        t.equal(response.statusCode, 200, '200 status code');
    });
});
