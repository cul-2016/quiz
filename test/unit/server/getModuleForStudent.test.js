import test from 'tape';
import getModuleForStudent from '../../../server/lib/getModuleForStudent';
import { testClient } from '../../utils/init';

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
            first_quiz: false,
            high_score: false,
            overall_average: false,
            participation: false
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
