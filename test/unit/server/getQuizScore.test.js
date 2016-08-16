import test from 'tape';
import getQuizScore from '../../../server/lib/getQuizScore';
import { testClient } from '../../utils/init';

test('Gets a student\'s score for a quiz', (t) => {

    t.plan(1);
    const expectedRows = [{ count: '2' }];

    const user_id = 1;
    const quiz_id = 2;

    getQuizScore(testClient, user_id, quiz_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expectedRows, 'returns the correct score');
    });
});
