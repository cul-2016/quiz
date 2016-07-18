import test from 'tape';
import validateModuleID from '../../../server/lib/validateModuleID';
import { testClient } from '../../utils/init';


test('validateModuleID returns true for a pre-existing module_id', (t) => {

    t.plan(2);

    const expected = true;
    validateModuleID(testClient, 'TEST', (error, response) => {

        if (error) {
            console.error(error);
        }
        t.ok(typeof response === 'boolean', 'validateModuleID returns a boolean');
        t.deepEqual(response, expected, 'database returns true');
    });
});

test('validateModuleID returns false for a pre-existing module_id', (t) => {

    t.plan(2);

    const expected = false;
    validateModuleID(testClient, 'NEW1', (error, response) => {

        if (error) {
            console.error(error);
        }
        t.ok(typeof response === 'boolean', 'validateModuleID returns a boolean');
        t.deepEqual(response, expected, 'database returns false');
    });
});
