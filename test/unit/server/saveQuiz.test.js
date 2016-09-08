import test from 'tape';
import { testClient } from '../../utils/init';
import saveQuiz from '../../../server/lib/saveQuiz';

test('`saveQuiz` returns the quiz id for the saved quiz', (t) => {

    t.plan(1);
    const expected = 5; 
    saveQuiz(testClient, 'TEST', 'Week 1 Test', (error, response) => {
        t.deepEquals(response, expected);
    });
});
