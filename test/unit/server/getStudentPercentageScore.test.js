import test from 'tape';
import getStudentPercentageScore from '../../../server/lib/getStudentPercentageScore';
import { allPercentageScoresData } from '../../utils/data-fixtures';


test('`getStudentPercentageScore` works', (t) => {

    t.plan(1);

    const user_id = 17;
    const expected = 70;

    getStudentPercentageScore(user_id, allPercentageScoresData, (error, result) => {

        t.equal(result, expected);
    });
});

test('`getStudentPercentageScore` return an error if user_id is not found', (t) => {

    t.plan(2);

    const user_id = 1;

    getStudentPercentageScore(user_id, allPercentageScoresData, (error, result) => {

        t.ok(error instanceof Error, 'An error is returned');
        t.notOk(result);
    });
});
