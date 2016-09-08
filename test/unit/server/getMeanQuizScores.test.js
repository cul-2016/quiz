import test from 'tape';
import getMeanQuizScores from '../../../server/lib/getMeanQuizScores';
import { testClient } from '../../utils/init';


test('`getMeanQuizScores` returns the mean score for each quiz in a module', (t) => {

    const module_id = 'CENT';
    const expected = [{ quiz_id: 3, mean_score: '5.50' }];

    getMeanQuizScores(testClient, module_id, (error, result) => {

        t.plan(1);
        t.deepEqual(result, expected);
    });
});
