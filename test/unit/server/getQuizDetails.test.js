import test from 'tape';
import getQuizDetails from '../../../server/lib/getQuizDetails';
import { testClient } from '../../utils/init';

test('Gets quiz name and questions for a given quiz', (t) => {

    t.plan(1);
    const expectedRows = { name: 'Week 1 Quiz', questions: [{ a: 'London', b: 'Cardiff', c: 'Edinburgh', correct_answer: 'a', d: 'Doncaster', question: 'What is the capital of England?', question_id: 1 }, { a: 'Zagreb', b: 'Cardiff', c: 'Edinburgh', correct_answer: 'a', d: 'Doncaster', question: 'What is the capital of Croatia?', question_id: 2 }] };

    getQuizDetails(testClient, 1, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct quiz Details');
    });
});
