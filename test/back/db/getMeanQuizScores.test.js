const test = require('tape');
const getMeanQuizScores = require('../../../server/lib/getMeanQuizScores.js');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getMeanQuizScores` returns the mean score for each quiz in a module', (t) => {

    t.plan(1);

    initDb()
    .then(() => {

        const module_id = 'CENT';
        const expected = [
            { quiz_id: 3, mean_score: 5.5 },
            { quiz_id: 4, mean_score: 1.67 },
            { quiz_id: 5, mean_score: 1.33 },
            { quiz_id: 6, mean_score: 1 }
        ];

        getMeanQuizScores(pool, module_id, (error, result) => {


            if (error) {
                console.error(error);
            }
            t.deepEqual(result, expected);
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});


