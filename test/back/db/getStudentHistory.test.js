const test = require('tape');
const getStudentHistory = require('../../../server/lib/getStudentHistory');
const { pool } = require('../../utils/init');
const expected = require('../../utils/data-fixtures').studentHistoryData;

test('`getStudentHistory` works', (t) => {

    t.plan(1);

    const user_id = 8;
    const module_id = 'CENT';

    getStudentHistory(pool, user_id, module_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'database returns student history');
    });
});
