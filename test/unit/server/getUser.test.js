import test from 'tape';
import getUserByEmail from '../../../server/lib/getUserByEmail';
import { testClient } from '../../utils/init';
import { users as expectedRows } from '../../utils/data-fixtures';

test('`getUserByEmail` works', (t) => {

    t.plan(1);
    const emailAddress = 'student@city.ac.uk';

    getUserByEmail(testClient, emailAddress, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct details for the user');
    });
});
