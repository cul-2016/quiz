const test = require('tape');
const getIsLastQuiz = require('../../../server/lib/getIsLastQuiz');
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getIsLastQuiz` Gets is_last_quiz for a given quiz', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const expected = false;
        const quiz_id = 1;
        getIsLastQuiz(pool, quiz_id, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEquals(response, expected, 'database returns correct value');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});


