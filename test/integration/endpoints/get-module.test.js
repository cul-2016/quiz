import test from 'tape';
import { server } from '../../utils/init';
import { getModuleData as expected } from '../../utils/data-fixtures';


test('`get-module` endpoint works', (t) => {

    t.plan(2);

    server.inject('/get-module?module_id=TEST', (response) => {

        const data = response.result;

        t.equal(response.statusCode, 200, '200 status code');
        t.deepEqual(data, expected);
    });
});
