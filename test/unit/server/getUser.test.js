import test from 'tape';
import getUser from '../../../server/lib/getUser';
import { testClient } from '../../utils/init';
import { users as expectedRows } from '../../utils/data-fixtures';

test('getting user details from the database', (t) => {
    t.plan(1);
    getUser(testClient, 'student@city.ac.uk', (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct details for the user');
    });
});
