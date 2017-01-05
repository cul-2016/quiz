const test = require('tape');
const getScoresForLeaderboard = require('../../../server/lib/getScoresForLeaderboard');
const { pool } = require('../../utils/init');
const expected = require('../../utils/data-fixtures').getScoresForLeaderboardData;

test('`getScoresForLeaderboard` works', (t) => {

    t.plan(1);

    const module_id = 'TEST';

    getScoresForLeaderboard(pool, module_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'database returns all scores for all quizzes for each student');
    });
});
