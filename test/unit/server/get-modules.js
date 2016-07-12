import test from 'tape';
import getModules from '../../../server/lib/get-modules';

test('getting modules from database for a given lecturer using user_id', (t) => {

    t.plan(2);
    const expectedRows = [{ module_id: 'TEST', name: 'test module' }];
    const expectedCommand = 'SELECT';
    getModules('1', (error, response) => {

        t.deepEquals(response.rows, expectedRows, 'database returns correct row of module');
        t.deepEquals(response.command, expectedCommand, 'Correct command of SELECT, lecturer is saved to db correctly');

    });

});
