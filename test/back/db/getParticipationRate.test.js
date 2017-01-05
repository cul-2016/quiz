const test = require('tape');
const getParticipationRate = require('../../../server/lib/getParticipationRate');
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getParticipationRate` returns null for a student with fewer than 4 quiz submissions', (t) => {

    t.plan(1);

    initDb()
    .then(() => {

        const user_id = 1;
        const module_id = 'TEST';

        getParticipationRate(pool, user_id, module_id, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.equal(response, null, 'null is returned');
        });
    });
});

test('`getParticipationRate` returns rate for a student with at least 4 quiz submissions', (t) => {

    t.plan(1);

    initDb()
    .then(() => {

        const user_id = 8;
        const module_id = 'CENT';
        const expected = 100;

        getParticipationRate(pool, user_id, module_id, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.equal(response, expected, 'database returns correct participation rate');
        });

    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});

