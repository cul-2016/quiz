const test = require('tape');
const getNewTrophyState = require('../../../server/lib/getNewTrophyState');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test("`getNewTrophyState` returns all trophies in state when is_last_quiz is set to true", (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const user_id = 1;
        const module_id = 'TEST';
        const quiz_id = 2;
        const percentageScore = 33;
        const expected = {
            first_quiz: true,
            high_score: false,
            participation: true,
            overall_score: true
        };
        getNewTrophyState(pool, user_id, module_id, quiz_id, percentageScore, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEqual(response, expected, 'returns the new trophy state');
        });
    });
});


test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
