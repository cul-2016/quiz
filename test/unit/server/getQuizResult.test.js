import test from 'tape';
import getQuizResult from '../../../server/lib/getQuizResult';
import { testClient } from '../../utils/init';

test('Gets a student\'s result for a quiz', (t) => {

    t.plan(1);

    const user_id = 1;
    const quiz_id = 2;
    const expected = {
        score: 2
    };

    getQuizResult(testClient, user_id, quiz_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'returns the correct result');
    });
});
