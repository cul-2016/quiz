const test = require('tape');
const saveQuiz = require('../../../server/lib/saveQuiz');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`saveQuiz` returns the quiz id for the saved quiz', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const expected = 9;
        const module_id = 'TEST';
        const name = 'Week 1 Test';
        const is_last_quiz = true;

        saveQuiz(pool, module_id, name, is_last_quiz, (error, response) => {
            if (error) {
                console.error(error);
            }
            t.deepEqual(response, expected);
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
