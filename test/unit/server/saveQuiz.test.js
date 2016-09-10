import test from 'tape';
import { testClient } from '../../utils/init';
import saveQuiz from '../../../server/lib/saveQuiz';


test('`saveQuiz` returns the quiz id for the saved quiz', (t) => {

    t.plan(1);

    const expected = 7;
    const module_id = 'TEST';
    const name = 'Week 1 Test';

    saveQuiz(testClient, module_id, name, (error, response) => {
        t.deepEqual(response, expected);
    });
});
