import test from 'tape';
import getModuleList from '../../../server/lib/getModuleList';
import { testClient } from '../../utils/init';

test('Gets list of modules for a lecturer', (t) => {

    t.plan(1);
    const expectedRows = [{ module_id: 'TEST', name: 'test module' }, { module_id: 'PSY1', name: 'Intro to Psychology' }];

    getModuleList(testClient, '2', true, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct row of module');
    });
});

test('Gets list of modules for a student', (t) => {

    t.plan(1);
    const expectedRows = [{ module_id: 'TEST', name: 'test module' }, { module_id: 'PSY1', name: 'Intro to Psychology' }];

    getModuleList(testClient, '1', false, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct row of module');
    });
});
