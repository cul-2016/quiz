const test = require('tape');
const getQuizScores = require('../../../server/lib/getQuizScores');
const { testClient } = require('../../utils/init');

test('`getQuizScores` returns the scores for any quizzes a student has taken', (t) => {

    const user_id = 1;
    const module_id = 'TEST';
    const expected = [
        { quiz_id: 1, score: 2 },
        { quiz_id: 2, score: 1 }
    ];

    getQuizScores(testClient, user_id, module_id, (error, result) => {

        t.plan(1);
        t.deepEqual(result, expected);
    });
});
