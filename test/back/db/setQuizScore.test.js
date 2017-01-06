const test = require('tape');
const setQuizScore = require('../../../server/lib/setQuizScore');
const query = require('../../../server/lib/query');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test("`setQuizScore` updates a student's score for a quiz with an existing score", (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const user_id = 1,
            quiz_id = 2,
            score = 5,
            expected = score,
            expectedlength = 1;

        setQuizScore(pool, user_id, quiz_id, score, (error) => {
            if (error) {
                console.error(error);
            }
            const testQuery = "SELECT score FROM scores WHERE user_id = $1 AND quiz_id = $2;";

            query(pool, testQuery, [user_id, quiz_id], (error, result) => {
                t.equal(result.rows.length, expectedlength, 'There is only one score for the given user');
                t.equal(result.rows[0].score, expected, 'Score saves correctly');
                const resetQuery = "UPDATE scores SET score = 1 WHERE user_id = $1 AND quiz_id = $2;";
                query(pool, resetQuery, [user_id, quiz_id], (error) => {
                    if (error) throw error;
                });
            });
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
