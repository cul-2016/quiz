import test from 'tape';
import validateModuleID from '../../../server/lib/validateModuleID';
import { testClient } from '../../utils/init';

test('validating module_id with pre-existing module_id', (t) => {

    const expectedRows = [{ exists: true }];
    t.plan(1);
    validateModuleID(testClient, 'TEST', (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns true as the module_id already exists');
    });
});

test('validating module_id with dummy module_id', (t) => {

    const expectedRows = [{ exists: false }];
    t.plan(1);
    validateModuleID(testClient, 'NEW1', (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns false as the module_id doesnt exists');
    });
});
