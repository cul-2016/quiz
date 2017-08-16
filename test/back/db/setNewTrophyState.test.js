const test = require('tape');
const setNewTrophyState = require('../../../server/lib/setNewTrophyState');
const query = require('../../../server/lib/query');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test("`setNewTrophyState` sets a student's new trophy state when overall_average is present", (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const user_id = 3;
        const module_id = 'TEST';
        const newTrophyState =  {
            first_quiz: true,
            high_score: false,
            overall_score: true,
            participation: true
        };
        const expected = {
            first_quiz: true,
            high_score: false,
            overall_score: true,
            participation: true
        };
        setNewTrophyState(pool, user_id, module_id, newTrophyState, (error) => {

            if (error) {
                console.error(error);
            }
            var testQuery = "SELECT first_quiz, high_score, overall_score, participation FROM module_members WHERE user_id = $1 AND module_id = $2;";

            query(pool, testQuery, [user_id, module_id], (error, result) => {
                if (error) {
                    console.error(error);
                }
                t.deepEqual(result.rows[0], expected, 'sets the new trophy state');
            });
        });
    });
});

test("`setNewTrophyState` returns an error if newTrophyState does not have the correct number of properties (i.e. 3 or 4)", (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const user_id = 3;
        const module_id = 'TEST';
        const newTrophyState = {
            first_quiz: true,
        };

        setNewTrophyState(pool, user_id, module_id, newTrophyState, (error) => {
            if (error) {
                console.error(error);
            }
            t.ok(error, 'Function correctly returns an error');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
