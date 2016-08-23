import test from 'tape';
import { server } from '../../utils/init';


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

    server.inject('/join-module?module_id=TEST&user_id=1', (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});
