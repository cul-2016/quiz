import test from 'tape';
import { testClient } from '../../utils/init';
import updateIsLastQuiz from '../../../server/lib/updateIsLastQuiz';

test('`updateIsLastQuiz` updating is_last_quiz to false works', (t) => {

    t.plan(2);
    const expectedError = null;
    const expectedCommand = 'UPDATE';
    const quiz_id = 1;
    const module_id = 'TEST';
    updateIsLastQuiz(testClient, module_id, quiz_id, (error, response) => {
        t.deepEquals(error, expectedError, 'error is null, is_last_quiz is updated correctly correctly');
        t.deepEquals(response.command, expectedCommand, 'Correct command of UPDATE');
    });
});
