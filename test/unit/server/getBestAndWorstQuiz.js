import test from 'tape';
import getBestAndWorstQuiz from '../../../server/lib/getBestAndWorstQuiz';
import { testClient } from '../../utils/init';


test("`getBestAndWorstQuiz` returns the names of a student's best and worst quiz", (t) => {

    t.plan(1);

    const user_id = 6;
    const module_id = 'CENT';
    const expected = [
        { quiz_id: 3, name: 'Trivia quiz' }, // -4.5
        { quiz_id: 5, name: 'Arbitrary 2' } // -0.34
    ];
    getBestAndWorstQuiz(testClient, user_id, module_id, (error, result) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(result, expected);
    });
});

test.skip("`getBestAndWorstQuiz` returns null if student has done fewer than 3 quizzes", (t) => {

    t.plan(1);

    const user_id = 1;
    const module_id = 'TEST';

    getBestAndWorstQuiz(testClient, user_id, module_id, (error, result) => {

        t.equal(result, null, "null is returned");
    });
});
