const test = require('tape');
const getSignedDifference = require('../../../server/lib/getSignedDifference');

test("`getSignedDifference` returns a positive signed difference between a quiz's mean scores and the student's scores", (t) => {

    const studentScore = [{ quiz_id: 3, score: 8 }];
    const meanScore = [{ quiz_id: 3, mean_score: 5.50 }];
    const expected = [{ quiz_id: 3, difference: 2.5 }];

    getSignedDifference(studentScore, meanScore, (error, result) => {

        t.plan(1);
        t.deepEqual(result, expected);
    });
});

test("`getSignedDifference` returns a negative signed difference between a quiz's mean scores and the student's scores", (t) => {

    const studentScore = [{ quiz_id: 3, score: 1 }];
    const meanScore = [{ quiz_id: 3, mean_score: 5.50 }];
    const expected = [{ quiz_id: 3, difference: -4.5 }];

    getSignedDifference(studentScore, meanScore, (error, result) => {

        t.plan(1);
        t.deepEqual(result, expected);
    });
});
