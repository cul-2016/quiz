import test from 'tape';
import { server } from '../../utils/init';


test('`get-module-users` endpoint returns error if module_id is undefined', (t) => {

    t.plan(1);

    server.inject('/get-module-users', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`get-module-users` endpoint works', (t) => {

    t.plan(1);

    server.inject('/get-module-users?module_id=TEST', (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});
