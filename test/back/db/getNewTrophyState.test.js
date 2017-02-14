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
        const is_last_quiz = true;
        const expected = {
            first_quiz: true,
            high_score: false,
            participation: true,
            overall_average: true
        };
        getNewTrophyState(pool, user_id, module_id, quiz_id, percentageScore, is_last_quiz, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEqual(response, expected, 'returns the new trophy state');
        });
    });
});

test("`getNewTrophyState` returns only first_quiz, high_score & participation in state when is_last_quiz is set to false", (t) => {

    t.plan(1);

    const user_id = 1,
        module_id = 'TEST',
        quiz_id = 2,
        percentageScore = 33,
        is_last_quiz = false;

    const expected = {
        first_quiz: true,
        high_score: false,
        participation: true
    };

    getNewTrophyState(pool, user_id, module_id, quiz_id, percentageScore, is_last_quiz, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'returns the new trophy state');
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});


