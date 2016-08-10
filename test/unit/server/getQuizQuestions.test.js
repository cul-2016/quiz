import test from 'tape';
import getQuizQuestions from '../../../server/lib/getQuizQuestions';
import { testClient } from '../../utils/init';

test('Gets list of questions for a quiz_id', (t) => {

    t.plan(1);
    const expectedRows = [{ question: 'What is the capital of England?',
        a: 'London',
        b: 'Cardiff',
        c: 'Edinburgh',
        d: 'Doncaster' },
      { question: 'What is the capital of Croatia?',
        a: 'Zagreb',
        b: 'Cardiff',
        c: 'Edinburgh',
        d: 'Doncaster' }];

    getQuizQuestions(testClient, '1', (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct row of questions');
    });
});
