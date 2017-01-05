const test = require('tape');
const getModuleForLecturer = require('../../../server/lib/getModuleForLecturer');
const expected = require('../../utils/data-fixtures').getModuleForLecturerData;
const { pool } = require('../../utils/init');

test('`getModuleForLecturer` returns correct module information', (t) => {

    t.plan(1);

    const module_id = 'TEST';

    getModuleForLecturer(pool, module_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected, 'database returns correct row module details');
    });
});
