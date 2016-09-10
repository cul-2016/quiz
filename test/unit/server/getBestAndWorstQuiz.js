import test from 'tape';
import getBestAndWorstQuiz from '../../../server/lib/getBestAndWorstQuiz';
import { testClient } from '../../utils/init';


test.skip("`getBestAndWorstQuiz` returns the names of a student's best and worst quiz", (t) => {

    t.plan(1);

    const user_id = 1;
    const module_id = 'TEST';
    const expected = { //eslint-disable-line no-unused-vars
        best: '',
        worst: ''
    };
    getBestAndWorstQuiz(testClient, user_id, module_id, (error, result) => {

        console.log(result.m, result.s);
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
