import test from 'tape';
import getNewTrophyState from '../../../server/lib/getNewTrophyState';
import { testClient } from '../../utils/init';

test("`getNewTrophyState` gets a student's new trophy state", (t) => {

    t.plan(1);

    const user_id = 1;
    const module_id = 'TEST';
    const quiz_id = 2;
    const percentageScore = 33;

    const expected = [true, false, true, true];

    getNewTrophyState(testClient, user_id, module_id, quiz_id, percentageScore, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'returns the new trophy state');
    });
});
