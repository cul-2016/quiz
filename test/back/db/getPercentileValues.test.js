const test = require('tape');
const getPercentileValues = require('../../../server/lib/getPercentileValues');
const averageScores = require('../../utils/data-fixtures').allPercentageScoresData;

test('`getPercentileValues` works', (t) => {

    t.plan(1);

    const BOUNDARIES = [10, 25, 50, 90, 100];
    const expected = [95, 80, 63.75, 25, 10];

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
