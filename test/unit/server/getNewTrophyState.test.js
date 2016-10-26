import test from 'tape';
import getNewTrophyState from '../../../server/lib/getNewTrophyState';
import { testClient } from '../../utils/init';

test("`getNewTrophyState` returns all trophies in state when is_last_quiz is set to true", (t) => {

    t.plan(1);

    const user_id = 1;
    const module_id = 'TEST';
    const quiz_id = 2;
    const percentageScore = 33;
    const is_last_quiz = true;
    const expected = {
        first_quiz: true,
        high_score: true,
        participation: true,
        overall_average: true
    };
    getNewTrophyState(testClient, user_id, module_id, quiz_id, percentageScore, is_last_quiz, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'returns the new trophy state');
    });
});

test("`getNewTrophyState` returns only first_quiz, high_score & participation in state when is_last_quiz is set to false", (t) => {

    t.plan(1);

    const user_id = 1,
        module_id = 'TEST',
        quiz_id = 2,
        percentageScore = 33,
        is_last_quiz = false;

    const expected = {
        first_quiz: true,
        high_score: true,
        participation: true
    };

    getNewTrophyState(testClient, user_id, module_id, quiz_id, percentageScore, is_last_quiz, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'returns the new trophy state');
    });
});
