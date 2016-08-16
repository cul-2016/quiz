import test from 'tape';
import editScore from '../../../server/lib/editScore';
import { testClient } from '../../utils/init';

test('editing score for a user in a quiz', (t) => {
    t.plan(2);
    const expectedError = null;
    const expectedCommand = 'UPDATE';
    var quiz_id = 1;
    var user_id = 1;
    var score = 10;
    editScore(testClient, quiz_id, user_id, score, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.equal(error, expectedError, 'error is null, module is saved to db correctly.');
        t.deepEqual(response.command, expectedCommand, 'Correct command of UPDATE, score is edited correctly');
    });
});
