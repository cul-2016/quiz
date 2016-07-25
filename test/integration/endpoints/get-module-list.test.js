import test from 'tape';
import { server } from '../../utils/init';


test('`get-module-list` endpoint works', (t) => {

    t.plan(2);

    server.inject('/get-module-list?user_id=1', (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});
