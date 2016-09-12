import test from 'tape';
import getUser from '../../../server/lib/getUser';
import { testClient } from '../../utils/init';
import { users as expectedRows } from '../../utils/data-fixtures';

test('`getUser` works', (t) => {

    t.plan(1);
    const emailAddress = 'student@city.ac.uk';

    getUser(testClient, emailAddress, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct details for the user');
    });
});
