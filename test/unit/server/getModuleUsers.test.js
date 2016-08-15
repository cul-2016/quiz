import test from 'tape';
import getModuleUsers from '../../../server/lib/getModuleUsers';
import { testClient } from '../../utils/init';

test('Gets list of users for a given module', (t) => {

    t.plan(1);
    const expectedRows = [{ email: 'student@city.ac.uk', user_id: 1, username: 'student' }];

    getModuleUsers(testClient, 'TEST', (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct row of users');
    });
});
