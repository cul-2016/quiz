import test from 'tape';
import { testClient } from '../../utils/init';
import updateQuestions from '../../../server/lib/updateQuestions';

test('updating questions in database works', (t) => {

    t.plan(2);
    const expectedError = null;
    const expectedCommand = 'INSERT';
    const editedQuestions = [{ question_id: 2,
    question: 'What is the capital of Croatia?',
    a: 'Zagreb',
    b: 'Cardiff',
    c: 'Edinburgh',
    d: 'Doncaster',
    correct_answer: 'a',
    quiz_id: '1' },
  { question_id: 1,
    question: 'What is the capital of England?',
    a: 'London',
    b: 'Cardiff',
    c: 'Edinburgh',
    d: 'Doncaster',
    correct_answer: 'a',
    quiz_id: '1' }];

    updateQuestions(testClient, editedQuestions, (error, response) => {
        t.deepEquals(error, expectedError, 'error is null, quiz name updated correctly');
        t.deepEquals(response.command, expectedCommand, 'Correct command of UPDATE');
    });
});
