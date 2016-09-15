import test from 'tape';
import getModuleList from '../../../server/lib/getModuleList';
import { testClient } from '../../utils/init';

test('`getModuleList` gets list of modules for a lecturer', (t) => {

    t.plan(1);
    const expectedRows = [
        { module_id: 'TEST', name: 'test module' },
        { module_id: 'PSY1', name: 'Intro to Psychology' },
        { module_id: 'CENT', name: 'Percentile' }
    ];
    const user_id = 2;

    getModuleList(testClient, user_id, true, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct row of module');
    });
});

test('`getModuleList` gets list of modules for a student', (t) => {

    t.plan(1);
    const expectedRows = [
        { module_id: 'TEST', name: 'test module' },
        { module_id: 'PSY1', name: 'Intro to Psychology' }
    ];
    const user_id = 1;

    getModuleList(testClient, user_id, false, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct row of module');
    });
});
