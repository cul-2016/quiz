import test from 'tape';
import getStudentAverageScore from '../../../server/lib/getStudentAverageScore';
import { allAverageScoresData } from '../../utils/data-fixtures';


test('`getStudentAverageScore` works', (t) => {

    t.plan(1);

    const user_id = 17;
    const expected = 70;

    getStudentAverageScore(user_id, allAverageScoresData, (error, result) => {

        t.equal(result, expected);
    });
});

test('`getStudentAverageScore` return an error if user_id is not found', (t) => {

    t.plan(2);

    const user_id = 1;

    getStudentAverageScore(user_id, allAverageScoresData, (error, result) => {

        t.ok(error instanceof Error, 'An error is returned');
        t.notOk(result);
    });
});
