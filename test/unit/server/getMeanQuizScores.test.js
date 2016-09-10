import test from 'tape';
import getMeanQuizScores from '../../../server/lib/getMeanQuizScores';
import { testClient } from '../../utils/init';


test.skip('`getMeanQuizScores` returns the mean score for each quiz in a module', (t) => {

    t.plan(1);

    const module_id = 'CENT';
    const expected = [{ quiz_id: 3, mean_score: 5.50 }];

    getMeanQuizScores(testClient, module_id, (error, result) => {


        if (error) {
            console.error(error);
        }
        t.deepEqual(result, expected);
    });
});
