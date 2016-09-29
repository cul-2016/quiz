import test from 'tape';
import getQuizQuestions from '../../../server/lib/getQuizQuestions';
import { testClient } from '../../utils/init';

test('`getQuizQuestions` gets list of questions for a quiz', (t) => {

    t.plan(1);
    const expectedRows = [
        {
            question_id: 1,
            question: 'What is the capital of England?',
            a: 'London',
            b: 'Cardiff',
            c: 'Edinburgh',
            d: 'Doncaster'
        },
        {
            question_id: 2,
            question: 'What is the capital of Croatia?',
            a: 'Zagreb',
            b: 'Cardiff',
            c: 'Edinburgh',
            d: 'Doncaster'
        }
    ];

    const quiz_id = 1;

    getQuizQuestions(testClient, quiz_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct row of questions');
    });
});
