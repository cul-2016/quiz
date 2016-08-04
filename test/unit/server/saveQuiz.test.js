import test from 'tape';
import { testClient } from '../../utils/init';
import saveQuiz from '../../../server/lib/saveQuiz';

test('saving quiz to database works and returns the quiz id for the saved quiz', (t) => {

    t.plan(1);
    const expected = 4; //reason it is 4 is that the other test is running first and creating a new quiz, hence when this function is run, its quiz_id is 4.
    saveQuiz(testClient, 'TEST', 'Week 1 Test', (error, response) => {
        t.deepEquals(response, expected);
    });
});
