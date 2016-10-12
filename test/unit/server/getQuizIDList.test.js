import test from 'tape';
import getQuizIDList from '../../../server/lib/getQuizIDList';
import { testClient } from '../../utils/init';
import { getQuizIDListData as expected } from '../../utils/data-fixtures';

test('`getQuizIDList` works', (t) => {

    t.plan(1);

    const module_id = 'TEST';

    getQuizIDList(testClient, module_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'database returns a list of quiz ids');
    });
});
