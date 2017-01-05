import test from 'tape';
import { testClient } from '../../utils/init';
import saveStudentResponse from '../../../server/lib/saveStudentResponse';

test('`saveStudentResponse` works', (t) => {

    t.plan(2);

    const expectedCommand = 'INSERT';
    const user_id = 1;
    const quiz_id = 1;
    const survey_id = null;
    const question_id = 1;
    const response = 'c';

    saveStudentResponse(testClient, user_id, quiz_id, survey_id, question_id, response, (error, response) => {
        if (error) {
            console.error(error);
            t.error('should not have errored');
        } else {
            t.pass('error is null, response is saved to db correctly.');
            t.deepEqual(response.command, expectedCommand, 'Correct command of INSERT, response is saved to db correctly');
        }
    });
});
