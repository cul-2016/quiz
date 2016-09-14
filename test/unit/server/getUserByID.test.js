import test from 'tape';
import getUserByID from '../../../server/lib/getUserByID';
import { testClient } from '../../utils/init';
import { users as expectedRows } from '../../utils/data-fixtures';

test('`getUserByID` works', (t) => {

    t.plan(1);
    const user_id = 1;

    getUserByID(testClient, user_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct details for the user');
    });
});
