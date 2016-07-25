import test from 'tape';
import { server } from '../../utils/init';


test.skip('`get-module` endpoint works', (t) => {

    t.plan(2);

    server.inject('/get-module?module_id=1', (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});
