import test from 'tape';
import { testClient } from '../../utils/init';
import { allPercentageScoresData as expected } from '../../utils/data-fixtures';
import getAllPercentageScores from '../../../server/lib/getAllPercentageScores';


test("`getAllPercentageScores` returns all students' average scores for a module", (t) => {

    t.plan(1);
    const module_id = 'CENT';

    getAllPercentageScores(testClient, module_id, (error, result) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(result, expected);
        // test they're in descending numerical order of average score
    });
});
