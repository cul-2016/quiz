import test from 'tape';
import { testClient } from '../../utils/init';
import { allAverageScoresData as expected } from '../../utils/data-fixtures';
import getAllAverageScores from '../../../server/lib/getAllAverageScores';


test.skip("`getAllAverageScores` returns all students' average scores for a module", (t) => {

    t.plan(1);
    const module_id = 'CENT';

    getAllAverageScores(testClient, module_id, (error, result) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(result, expected);
    });
});
