import test from 'tape';
import getLeaderboard from '../../../server/lib/getLeaderboard';
import { testClient } from '../../utils/init';
import { leaderboardData as expected } from '../../utils/data-fixtures';

test('`getLeaderboard` works', (t) => {

    t.plan(1);

    const module_id = 'TEST';

    getLeaderboard(testClient, module_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'database returns the leaderboard');
    });
});
