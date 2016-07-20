import test from 'tape';
import { server } from '../../utils/init';


test('`validate-module` endpoint works', (t) => {

    t.plan(2);

    server.inject('/validate-module?module_id=TEST', (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});
