import test from 'tape';
import getQuizReview from '../../../server/lib/getQuizReview';
import { testClient } from '../../utils/init';

test('Gets list of questions for a quiz review', (t) => {

    t.plan(1);
    const expectedRows = [{ quiz_id: 1,
        question_id: 1,
        question: 'What is the capital of England?',
        a: 'London',
        b: 'Cardiff',
        c: 'Edinburgh',
        d: 'Doncaster',
        correct_answer: 'a',
        a_response: '1',
        b_response: '0',
        c_response: '0',
        d_response: '0' },
      { quiz_id: 1,
        question_id: 2,
        question: 'What is the capital of Croatia?',
        a: 'Zagreb',
        b: 'Cardiff',
        c: 'Edinburgh',
        d: 'Doncaster',
        correct_answer: 'a',
        a_response: '0',
        b_response: '0',
        c_response: '0',
        d_response: '0' }];

    getQuizReview(testClient, '1', (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expectedRows, 'database returns the review');
    });
});
