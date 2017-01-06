const test = require('tape');
const getScoresForLeaderboard = require('../../../server/lib/getScoresForLeaderboard');
const expected = require('../../utils/data-fixtures.js').getScoresForLeaderboardData;
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getScoresForLeaderboard` works', (t) => {

    t.plan(1);

    initDb()
    .then(() => {

        const module_id = 'TEST';

        getScoresForLeaderboard(pool, module_id, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEqual(response, expected, 'database returns all scores for all quizzes for each student');
        });

    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});


