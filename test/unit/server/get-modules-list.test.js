import test from 'tape';
import getModuleList from '../../../server/lib/getModuleList';
import { testClient } from '../../utils/init';

test('getting list of modules from database for a given lecturer using user_id', (t) => {

    t.plan(1);
    const expectedRows = [{ module_id: 'TEST', name: 'test module' }];

    getModuleList(testClient, '2', (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct row of module');
    });
});
