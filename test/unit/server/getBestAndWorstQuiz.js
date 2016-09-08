import test from 'tape';
import getBestAndWorstQuiz from '../../../server/lib/getBestAndWorstQuiz';
import { testClient } from '../../utils/init';


test.skip("`getBestAndWorstQuiz` returns the names of a student's best and worst quiz", (t) => {

    t.plan(1);

    const user_id = 1;
    const module_id = 'TEST';
    const expected = {
        best: '',
        worst: ''
    };
    getBestAndWorstQuiz(testClient, user_id, module_id, (error, result) => {

        t.deepEqual(result, expected);
    });
});
