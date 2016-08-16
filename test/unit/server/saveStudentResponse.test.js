import test from 'tape';
import { testClient } from '../../utils/init';
import saveStudentResponse from '../../../server/lib/saveStudentResponse';

test('saving quiz to database works and returns the quiz id for the saved quiz', (t) => {

    t.plan(2);
    const expectedError = null;
    const expectedCommand = 'INSERT';
    const user_id = 1;
    const quiz_id = 1;
    const question_id = 1;
    const response = 'A';

    saveStudentResponse(testClient, user_id, quiz_id, question_id, response, (error, response) => {
        t.equal(error, expectedError, 'error is null, module is saved to db correctly.');
        t.deepEqual(response.command, expectedCommand, 'Correct command of INSERT, module is saved to db correctly');
    });
});
