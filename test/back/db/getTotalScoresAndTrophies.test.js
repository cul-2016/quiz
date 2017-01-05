const test = require('tape');
const getTotalScoresAndTrophies = require('../../../server/lib/getTotalScoresAndTrophies');
const expected = require('../../utils/data-fixtures').getTotalScoresAndTrophiesData;
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getTotalScoresAndTrophies` works', (t) => {
    t.plan(1);

    initDb()
    .then(() => {
        const module_id = 'TEST';
        getTotalScoresAndTrophies(pool, module_id, (error, mainData) => {
            t.deepEqual(mainData, expected, 'Returns total_scores and trophies. If no quiz data for a particular student, returns total_score as zero');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
