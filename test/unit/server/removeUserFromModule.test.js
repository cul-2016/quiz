import test from 'tape';
import { testClient } from '../../utils/init';
import removeModuleMember from '../../../server/lib/removeModuleMember';

test('saving quiz to database works and returns the quiz id for the saved quiz', (t) => {

    t.plan(2);
    const expectedError = null;
    const expectedCommand = 'DELETE';
    const module_id = 'TEST';
    const user_id = 1;

    removeModuleMember(testClient, module_id, user_id, (error, response) => {
        t.equal(error, expectedError, 'error is null, user is deleted from the db correctly.');
        t.deepEqual(response.command, expectedCommand, 'Correct command of DELETE, module is saved to db correctly');
    });
});
