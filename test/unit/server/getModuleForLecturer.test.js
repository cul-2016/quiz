import test from 'tape';
import getModuleForLecturer from '../../../server/lib/getModuleForLecturer';
import { getModuleForLecturerData as expected } from '../../utils/data-fixtures';
import { testClient } from '../../utils/init';

test('`getModuleForLecturer` returns correct module information', (t) => {

    t.plan(1);

    const module_id = 'TEST';

    getModuleForLecturer(testClient, module_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'database returns correct row module details');
    });
});
