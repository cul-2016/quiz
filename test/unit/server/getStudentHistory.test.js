import test from 'tape';
import getStudentHistory from '../../../server/lib/getStudentHistory';
import { testClient } from '../../utils/init';
import { studentHistoryData as expected } from '../../utils/data-fixtures';

test('`getStudentHistory` works', (t) => {

    t.plan(1);

    const user_id = 8;
    const module_id = 'CENT';

    getStudentHistory(testClient, user_id, module_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'database returns student history');
    });
});
