import test from 'tape';
import getTotalScoresAndTrophies from '../../../server/lib/getTotalScoresAndTrophies';
import { testClient } from '../../utils/init';
import { getTotalScoresAndTrophiesData as expected } from '../../utils/data-fixtures';

test('`getTotalScoresAndTrophies` works', (t) => {

    t.plan(1);

    const module_id = 'TEST';

    getTotalScoresAndTrophies(testClient, module_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'database returns the scores and trophies');
    });
});
