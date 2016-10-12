import test from 'tape';
import query from '../../../server/lib/query';
import { testClient } from '../../utils/init';
import joinModule from '../../../server/lib/joinModule';

test.skip('`joinModule` adds a student to a module', (t) => {

    t.plan(2);

    const expectedCommand = 'INSERT';
    const module_id = 'TEST';
    const user_id = 3;

    joinModule(testClient, module_id, user_id, (error, response) => {
        t.equal(error, null, 'error is null, student joins the module correctly');
        t.deepEqual(response.command, expectedCommand, 'Correct command of INSERT, user is added to module_members correctly');
    });
});

test('`joinModule` does not add duplicate students to a module', (t) => {

    t.plan(1);

    const module_id = 'TEST';
    const user_id = 3;

    joinModule(testClient, module_id, user_id, (error) => {

        if (error) {
            console.error(error);
        }

        let queryText = "SELECT (module_id, user_id) FROM module_members WHERE module_id = ($1) AND user_id = ($2);";

        query(testClient, queryText, [module_id, user_id], (error, response) => {

            t.equal(response.rowCount, 1, 'Duplicate values not inserted');
        });
    });
});
