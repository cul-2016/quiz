import test from 'tape';
import getModuleForStudent from '../../../server/lib/getModuleForStudent';
import { testClient } from '../../utils/init';

test('Gets the module for a given student', (t) => {

    t.plan(1);
    const expectedRows = { medals: { condition: [39, 69], medal_name: ['bronze', 'silver', 'gold'] }, module_id: 'TEST', name: 'test module', trophies_awarded: { first_quiz: false, high_score: false, overall_average: false, participation: false } };

    getModuleForStudent(testClient, 'TEST', 1, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct row module details');
    });
});
