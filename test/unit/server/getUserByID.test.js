import test from 'tape';
import getUserByID from '../../../server/lib/getUserByID';
import { testClient } from '../../utils/init';
import { users as expectedRows } from '../../utils/data-fixtures';

test('getting user details from the database', (t) => {
    t.plan(1);
    getUserByID(testClient, 1, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct details for the user');
    });
});
