import test from 'tape';
import { testClient } from '../../utils/init';
import updateQuiz from '../../../server/lib/updateQuiz';

test('updating quiz to database works', (t) => {

    t.plan(2);
    const expectedError = null;
    const expectedCommand = 'UPDATE';

    updateQuiz(testClient, 1, 'TEST', 'Updated Name', (error, response) => {
        t.deepEquals(error, expectedError, 'error is null, quiz name updated correctly');
        t.deepEquals(response.command, expectedCommand, 'Correct command of UPDATE');
    });
});
