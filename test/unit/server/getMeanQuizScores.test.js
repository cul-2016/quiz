import test from 'tape';
import getMeanQuizScores from '../../../server/lib/getMeanQuizScores';
import { testClient } from '../../utils/init';


test('`getMeanQuizScores` returns the mean score for each quiz in a module', (t) => {

    t.plan(1);

    const module_id = 'CENT';
    const expected = [
        { quiz_id: 3, mean_score: 5.5 },
        { quiz_id: 4, mean_score: 1.67 },
        { quiz_id: 5, mean_score: 1.33 }
    ];

    getMeanQuizScores(testClient, module_id, (error, result) => {


        if (error) {
            console.error(error);
        }
        t.deepEqual(result, expected);
    });
});
