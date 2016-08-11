import test from 'tape';
import { testClient } from '../../utils/init';
import joinModule from '../../../server/lib/joinModule';

test('adding the user to a given module via module_members table', (t) => {

    t.plan(2);
    const expectedError = null;
    const expectedCommand = 'INSERT';
    const module_id = 'TEST';
    const user_id = 2;
    joinModule(testClient, module_id, user_id, (error, response) => {
        t.equal(error, expectedError, 'error is null, user joins the module correctly');
        t.deepEqual(response.command, expectedCommand, 'Correct command of INSERT, user is added to module_members correctly');
    });
});

test('deleting the member from module_members', (t) => {

    testClient.connect((error, client, done) => {

        if (error) {
            console.error(error, 'error from deleting module from the database');
        }
        client.query('DELETE FROM module_members WHERE user_id = $1', [2]);
        done();
        t.end();
    });
});
