import test from 'tape';
import { testClient } from '../../utils/init';
import updateQuiz from '../../../server/lib/updateQuiz';

test('`updateQuiz` works', (t) => {

    t.plan(2);
    const expectedError = null;
    const expectedCommand = 'UPDATE';
    const quiz_id = 1;
    const module_id = 'TEST';

    updateQuiz(testClient, quiz_id, module_id, 'Updated Name', (error, response) => {
        t.deepEquals(error, expectedError, 'error is null, quiz name updated correctly');
        t.deepEquals(response.command, expectedCommand, 'Correct command of UPDATE');
    });
});
