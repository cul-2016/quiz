import test from 'tape';
import getScoresForLeaderboard from '../../../server/lib/getScoresForLeaderboard';
import { testClient } from '../../utils/init';
import { getScoresForLeaderboardData as expected } from '../../utils/data-fixtures';


test('`getScoresForLeaderboard` works', (t) => {

    t.plan(1);

    const module_id = 'TEST';

    getScoresForLeaderboard(testClient, module_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'database returns all scores for all quizzes for each student');
    });
});
