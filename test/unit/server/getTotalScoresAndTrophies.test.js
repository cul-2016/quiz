import test from 'tape';
import getTotalScoresAndTrophies from '../../../server/lib/getTotalScoresAndTrophies';
import { getTotalScoresAndTrophiesData as expected } from '../../utils/data-fixtures';
import { testClient } from '../../utils/init';

test('`getTotalScoresAndTrophies` works', (t) => {
    t.plan(1);
    const module_id = 'TEST';
    getTotalScoresAndTrophies(testClient, module_id, (error, mainData) => {

        t.deepEqual(mainData, expected, 'Returns total_scores and trophies. If no quiz data for a particular student, returns total_score as zero');
    });
});
