import test from 'tape';
import { testClient } from '../../utils/init';
import { allPercentageScoresData as expected } from '../../utils/data-fixtures';
import getAllPercentageScores from '../../../server/lib/getAllPercentageScores';


test.skip("`getAllPercentageScores` returns all students' average scores for a module", (t) => {

    t.plan(2);
    const module_id = 'CENT';

    getAllPercentageScores(testClient, module_id, (error, result) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(result, expected);
        t.ok(isDescendingOrder(result), 'Values are in descending numerical order');
    });
});


function isDescendingOrder (array) {

    return (function iterate (array, i) {

        if (i === array.length - 1) {
            return true;
        }
        if (array[i].average < array[i + 1].average) {
            return false;
        }
        return iterate(array, ++i);
    })(array, 0);
}
