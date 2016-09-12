import test from 'tape';
import getNewTrophyState from '../../../server/lib/getNewTrophyState';
import { testClient } from '../../utils/init';

test("`getNewTrophyState` gets a student's new trophy state when is_last_quiz is set to true", (t) => {

    t.plan(1);

    const user_id = 1,
        module_id = 'TEST',
        quiz_id = 2,
        percentageScore = 33,
        is_last_quiz = true;

    const expected = [true, false, true, true];

    getNewTrophyState(testClient, user_id, module_id, quiz_id, percentageScore, is_last_quiz, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'returns the new trophy state');
    });
});

test("`getNewTrophyState` gets a student's new trophy state when is_last_quiz is set to false", (t) => {

    t.plan(1);

    const user_id = 1,
        module_id = 'TEST',
        quiz_id = 2,
        percentageScore = 33,
        is_last_quiz = false;

    const expected = [true, false, true];

    getNewTrophyState(testClient, user_id, module_id, quiz_id, percentageScore, is_last_quiz, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'returns the new trophy state');
    });
});
