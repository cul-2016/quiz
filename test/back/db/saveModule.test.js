const test = require('tape');
const { pool } = require('../../utils/init');
const saveModule = require('../../../server/lib/saveModule');
const { medals, trophies } = require('../../utils/data-fixtures');

test('`saveModule` a module to the database works ok', (t) => {

    t.plan(2);
    const expectedError = null;
    const expectedCommand = 'INSERT';
    const module_id = "MOD1";
    const user_id = 1;
    const name = "Test Module";

    saveModule(pool, module_id, user_id, name, medals, trophies, (error, response) => {

        t.equal(error, expectedError, 'error is null, module is saved to db correctly.');
        t.deepEqual(response.command, expectedCommand, 'Correct command of INSERT, module is saved to db correctly');
    });
});

test('--deleting lecturer from the database--', (t) => {

    pool.connect((error, client, done) => {

        if (error) {
            console.error(error, 'error from deleting module from the database');
        }
        client.query('DELETE FROM modules WHERE module_id = $1', ['MOD1']);
        done();
        t.end();
    });
});
