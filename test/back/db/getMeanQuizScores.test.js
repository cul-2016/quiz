const test = require('tape');
const getMeanQuizScores = require('../../../server/lib/getMeanQuizScores');
const { pool } = require('../../utils/init');

test('`getMeanQuizScores` returns the mean score for each quiz in a module', (t) => {

    t.plan(1);

    const module_id = 'CENT';
    const expected = [
        { quiz_id: 3, mean_score: 5.5 },
        { quiz_id: 4, mean_score: 1.67 },
        { quiz_id: 5, mean_score: 1.33 },
        { quiz_id: 6, mean_score: 1 }
    ];

    getMeanQuizScores(pool, module_id, (error, result) => {


        if (error) {
            console.error(error);
        }
        t.deepEqual(result, expected);
    });
});
