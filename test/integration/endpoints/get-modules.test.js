import test from 'tape';
import { server } from '../../utils/init';
import { dashboardData as data } from '../../utils/data-fixtures';

test('`get-modules` works', (t) => {

    t.plan(2);

    server.inject('/get-modules?user_id=1', (response) => {

        t.equal(response.result.rowCount, 1, 'Returns one row');
        t.deepEqual(response.result.rows, data, 'Returns expected data');
    });
});
