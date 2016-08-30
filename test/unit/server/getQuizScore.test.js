import test from 'tape';
import getQuizScore from '../../../server/lib/getQuizScore';
import { testClient } from '../../utils/init';

test("Gets a student's score for a quiz", (t) => {

    t.plan(1);

    const user_id = 1;
    const quiz_id = 2;
    const expected = {
        raw: 1,
        percentage: 33
    };

    getQuizScore(testClient, user_id, quiz_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'returns the correct score');
    });
});
