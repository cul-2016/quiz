const test = require('tape');
const getBoundaryIndex = require('../../../server/lib/getBoundaryIndex');
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getBoundaryIndex` works', (t) => {

    // boundary percentile values --> [10, 25, 50, 90, 100]
    t.plan(1);

    initDb()
    .then(() => {

        const score = 73;
        const range = [95, 80, 55, 15, 10];
        const expected = 2;

        getBoundaryIndex(score, range, (error, result) => {

            t.equal(result, expected);
        });
    });
});

test('`getBoundaryIndex` returns an error for an invalid score', (t) => {

    // boundary percentile values --> [10, 25, 50, 90, 100]
    t.plan(4);

    initDb()
    .then(() => {

        const score_1 = -16;
        const score_2 = 132;
        const range = [95, 80, 55, 15, 10];

        getBoundaryIndex(score_1, range, (error, result) => {

            t.ok(error instanceof RangeError, 'A RangeError is returned');
            t.notOk(result);
        });

        getBoundaryIndex(score_2, range, (error, result) => {

            t.ok(error instanceof RangeError, 'A RangeError is returned');
            t.notOk(result);
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});


