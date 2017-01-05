const test = require('tape');
const getModuleForStudent = require('../../../server/lib/getModuleForStudent');
const { testClient } = require('../../utils/init');

test('`getModuleForStudent` gets module info for a given student', (t) => {

    t.plan(1);
    const expectedRows = {
        medals: {
            condition: [39, 69],
            medal_name: ['bronze', 'silver', 'gold']
        },
        module_id: 'TEST',
        name: 'test module',
        trophies_awarded: {
            first_quiz: true,
            high_score: true,
            overall_average: false,
            participation: true
        }
    };

    const user_id = 1;
    const module_id = 'TEST';

    getModuleForStudent(testClient, user_id, module_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct row module details');
    });
});
