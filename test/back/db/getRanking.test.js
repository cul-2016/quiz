const test = require('tape');
const getRanking = require('../../../server/lib/getRanking');
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

// boundary percentile values --> [10, 25, 50, 90, 100]
// corresponding boundary scores  [95, 80, 55, 15, 10]

test("`getRanking` correctly ranks students within 1 - 10% percentile", (t) => {

    t.plan(1);

    initDb()
    .then(() => {

        const module_id = 'CENT';
        const user_id = 24; //score: 100
        const expected = 10;

        getRanking(pool, user_id, module_id, (error, result) => {

            if (error) {
                console.error(error);
            }
            t.equal(result, expected, 'Value `10` is returned');
        });

    });
});


test("`getRanking` correctly ranks students within 11 - 25% percentile", (t) => {

    t.plan(2);

    initDb()
    .then(() => {

        const module_id = 'CENT';
        const user_id_1 = 22; //score: 90
        const user_id_2 = 19; //score: 80
        const expected = 25;

        getRanking(pool, user_id_1, module_id, (error, result) => {

            if (error) {
                console.error(error);
            }
            t.equal(result, expected, 'Value `25` is returned');
        });
        getRanking(pool, user_id_2, module_id, (error, result) => {

            if (error) {
                console.error(error);
            }
            t.equal(result, expected, 'Value `25` is returned');
        });

    });
});


test("`getRanking` correctly ranks students within 26 - 50% percentile", (t) => {

    t.plan(2);

    initDb()
    .then(() => {

        const module_id = 'CENT';
        const user_id_1 = 17;
        const user_id_2 = 18;
        const expected = 50;

        getRanking(pool, user_id_1, module_id, (error, result) => {

            if (error) {
                console.error(error);
            }
            t.equal(result, expected, 'Value `50` is returned');
        });
        getRanking(pool, user_id_2, module_id, (error, result) => {

            if (error) {
                console.error(error);
            }
            t.equal(result, expected, 'Value `50` is returned');
        });

    });
});

test("`getRanking` correctly ranks students within 51 - 90% percentile", (t) => {

    t.plan(3);

    initDb()
    .then(() => {

        const module_id = 'CENT';
        const user_id_1 = 13; //score: 50
        const user_id_2 = 11; //score: 40
        const user_id_3 = 9; //score: 30
        const expected = 90;

        getRanking(pool, user_id_1, module_id, (error, result) => {

            if (error) {
                console.error(error);
            }
            t.equal(result, expected, 'Value `90` is returned');
        });
        getRanking(pool, user_id_2, module_id, (error, result) => {

            if (error) {
                console.error(error);
            }
            t.equal(result, expected, 'Value `90` is returned');
        });
        getRanking(pool, user_id_3, module_id, (error, result) => {

            if (error) {
                console.error(error);
            }
            t.equal(result, expected, 'Value `90` is returned');
        });

    });
});

test("`getRanking` correctly ranks students within 91 - 100% percentile", (t) => {

    t.plan(1);

    initDb()
    .then(() => {

        const module_id = 'CENT';
        const user_id = 5; //homer - score: 10
        const expected = 100;

        getRanking(pool, user_id, module_id, (error, result) => {

            if (error) {
                console.error(error);
            }
            t.equal(result, expected, 'Value `100` is returned');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});


