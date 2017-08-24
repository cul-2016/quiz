const test = require('tape');
const getModuleForStudent = require('../../../server/lib/getModuleForStudent');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getModuleForStudent` gets module info for a given student', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const expectedRows = {
            medals: {
                condition: [39, 69],
                medal_name: ['bronze', 'silver', 'gold']
            },
            module_id: 'TEST',
            name: 'test module',
            trophies_awarded: {
                first_quiz: false,
                high_score: false,
                overall_score: false,
                participation: false
            }
        };

        const user_id = 1;
        const module_id = 'TEST';

        getModuleForStudent(pool, user_id, module_id, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEquals(response, expectedRows, 'database returns correct row module details');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
