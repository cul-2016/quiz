import test from 'tape';
import getLeaderboard from '../../../server/lib/getLeaderboard';
import { testClient } from '../../utils/init';
import { leaderboardData as expected } from '../../utils/data-fixtures';

test('Gets the list for leaderboard', (t) => {

    t.plan(1);

    getLeaderboard(testClient, 'TEST', (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'database returns correct row of leaders');
    });
});
