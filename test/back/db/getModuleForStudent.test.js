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
            module_id: 'TEST',
            name: 'test module',
            medals: { medal_name: ['bronze', 'silver', 'gold'], condition: [39, 69] },
            uses_trophies: true,
            trophies_awarded: { first_quiz: false, high_score: false, participation: false, overall_score: false },
            trophies: { trophy_name: ['first_quiz', 'high_score', 'overall_score', 'participation'], condition: [1, 100, 2, 2] }
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
