import test from 'tape';
import { testClient } from '../../utils/init';
import saveStudentResponse from '../../../server/lib/saveStudentResponse';

test('saving student response works', (t) => {

    t.plan(2);
    const expectedError = null;
    const expectedCommand = 'INSERT';
    const user_id = 1;
    const quiz_id = 2;
    const question_id = 1;
    const response = 'a';

    saveStudentResponse(testClient, user_id, quiz_id, question_id, response, (error, response) => {
        t.equal(error, expectedError, 'error is null, response is saved to db correctly.');
        t.deepEqual(response.command, expectedCommand, 'Correct command of INSERT, response is saved to db correctly');
    });
});
