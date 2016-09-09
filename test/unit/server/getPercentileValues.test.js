import test from 'tape';
import getPercentileValues from '../../../server/lib/getPercentileValues';
import { allPercentageScoresData as averageScores } from '../../utils/data-fixtures';


test('`getPercentileValues` works', (t) => {

    t.plan(1);

    const BOUNDARIES = [10, 25, 50, 90, 100];
    const expected = [95, 80, 55, 15, 10];

    getPercentileValues(averageScores, BOUNDARIES, (error, result) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(result, expected);
    });
});

test('`getPercentileValues` returns an error if passed empty arrays', (t) => {

    t.plan(4);

    const BOUNDARIES = [10, 25, 50, 90, 100];

    getPercentileValues(averageScores, [], (error, result) => {

        t.ok(error instanceof Error);
        t.notOk(result);
    });
    getPercentileValues([], BOUNDARIES, (error, result) => {

        t.ok(error instanceof Error);
        t.notOk(result);
    });
});
