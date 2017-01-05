const test = require('tape');
const getStudentPercentageScore = require('../../../server/lib/getStudentPercentageScore');
const { allPercentageScoresData } = require('../../utils/data-fixtures');
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getStudentPercentageScore` works', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const user_id = 17;
        const expected = 70;
        getStudentPercentageScore(user_id, allPercentageScoresData, (error, result) => {

            t.equal(result, expected);
        });
    });
});

test('`getStudentPercentageScore` return an error if user_id is not found', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const user_id = 1;
        getStudentPercentageScore(user_id, allPercentageScoresData, (error, result) => {
            t.ok(error instanceof Error, 'An error is returned');
            t.notOk(result);
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
