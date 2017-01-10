const test = require('tape');
const getMinAndMaxValues = require('../../../server/lib/getMinAndMaxValues');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getMinAndMaxValues` returns the min and max values in an array of signed differences', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
    
        const array = [
            { quiz_id: 1, difference: 1 },
            { quiz_id: 2, difference: 8 },
            { quiz_id: 3, difference: 10 },
            { quiz_id: 54, difference: 5 },
            { quiz_id: 6, difference: -6 },
            { quiz_id: 9, difference: 3 }
        ];
        const expected = [
            { quiz_id: 6, difference: -6 },
            { quiz_id: 3, difference: 10 }
        ];
        const notExpected = [
            { quiz_id: 3, difference: 10 },
            { quiz_id: 6, difference: -6 }
        ];

        getMinAndMaxValues(array, (error, result) => {

            t.deepEqual(result, expected);
            t.notDeepEqual(result, notExpected);
        });

    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});


