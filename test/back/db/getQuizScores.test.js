const test = require('tape');
const getQuizScores = require('../../../server/lib/getQuizScores');
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getQuizScores` returns the scores for any quizzes a student has taken', (t) => {
    t.plan(1);

    initDb()
    .then(() => {
        const user_id = 1;
        const module_id = 'TEST';
        const expected = [
            { quiz_id: 1, score: 2 },
            { quiz_id: 2, score: 1 }
        ];

        getQuizScores(pool, user_id, module_id, (error, result) => {

            t.deepEqual(result, expected);
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});


