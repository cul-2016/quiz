import test from 'tape';
import getModules from '../../../server/lib/getModules';
import { testClient } from '../../utils/init';

test('getting modules from database for a given lecturer using user_id', (t) => {

    t.plan(1);
    const expectedRows = [{ module_id: 'TEST', name: 'test module' }];

    getModules(testClient, '1', (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct row of module');
    });
});
