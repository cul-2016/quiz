import test from 'tape';
import getModuleMembers from '../../../server/lib/getModuleMembers';
import { testClient } from '../../utils/init';

test('Gets list of users for a given module', (t) => {

    t.plan(1);
    const expectedRows = [{ email: 'student@city.ac.uk', user_id: 1, username: 'student' }];

    getModuleMembers(testClient, 'TEST', (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct row of users');
    });
});
