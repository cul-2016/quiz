import test from 'tape';
import getPercentileValues from '../../../server/lib/getPercentileValues';
import { allAverageScoresData as averageScores } from '../../utils/data-fixtures';

test.only('`getPercentileValues` works', (t) => {

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
