import test from 'tape';
import { server } from '../../utils/init';


test('`get-modules` endpoint works', (t) => {

    t.plan(2);

    server.inject('/get-modules?user_id=1', (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});
