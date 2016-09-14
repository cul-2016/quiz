import test from 'tape';
import { server } from '../../utils/init';


test('`get-student-history` endpoint returns error if user_id or module_id is undefined', (t) => {

    t.plan(2);

    const user_id = 8;
    const module_id = 'CENT';

    server.inject(`/get-student-history?user_id=${user_id}`, (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });

    server.inject(`/get-student-history?module_id=${module_id}`, (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`get-student-history` endpoint works', (t) => {

    t.plan(1);

    const user_id = 8;
    const module_id = 'CENT';

    server.inject(`/get-student-history?user_id=${user_id}&module_id=${module_id}`, (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});
