import test from 'tape';
import { testClient } from '../../utils/init';
import deleteQuestions from '../../../server/lib/deleteQuestions';

test('deleting user from module works', (t) => {

    t.plan(2);
    const expectedError = null;
    const expectedCommand = 'DELETE';
    const questions = [5];

    deleteQuestions(testClient, questions, (error, response) => {
        t.equal(error, expectedError, 'error is null, question is deleted from the db correctly.');
        t.deepEqual(response.command, expectedCommand, 'Correct command of DELETE, question is deleted from quiz');
    });
});
