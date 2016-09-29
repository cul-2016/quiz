import test from 'tape';
import { server } from '../../utils/init';


test('`get-module-list` endpoint returns error if is_lecturer is undefined', (t) => {

    t.plan(1);

    server.inject('/get-module-list?user_id=1', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`get-module-list` endpoint works for a lecturer', (t) => {

    t.plan(1);

    server.inject('/get-module-list?user_id=2&is_lecturer=true', (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});

test('`get-module-list` endpoint works for a student', (t) => {

    t.plan(1);

    server.inject('/get-module-list?user_id=1&is_lecturer=false', (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});
