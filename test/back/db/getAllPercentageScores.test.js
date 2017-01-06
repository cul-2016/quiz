const test = require('tape');
const getAllPercentageScores = require('../../../server/lib/getAllPercentageScores');
const expected = require('../../utils/data-fixtures.js').allPercentageScoresData;
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test("`getAllPercentageScores` returns all students' average scores for a module", (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const module_id = 'CENT';

        getAllPercentageScores(pool, module_id, (error, result) => {

            if (error) {
                console.error(error);
            }
            t.deepEqual(result, expected);
            t.ok(isDescendingOrder(result), 'Values are in descending numerical order');
        });
    });
});

const isDescendingOrder = (array) => {

    return (function iterate (array, i) {
    
        if (i === array.length - 1) {
            return true;
        }
        if (array[i].average < array[i + 1].average) {
            return false;
        }
        return iterate(array, ++i);
    })(array, 0);
}

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});

