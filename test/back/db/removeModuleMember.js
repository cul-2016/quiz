const test = require('tape');
const { testClient } = require('../../utils/init');
const removeModuleMember = require('../../../server/lib/removeModuleMember');

test('`removeModuleMember` works', (t) => {

    t.plan(2);
    const expectedError = null;
    const expectedCommand = 'DELETE';
    const module_id = 'CENT';
    const user_id = 17;

    removeModuleMember(testClient, module_id, user_id, (error, response) => {
        t.equal(error, expectedError, 'error is null, user is deleted from the db correctly.');
        t.deepEqual(response.command, expectedCommand, 'Correct command of DELETE, user is deleted from module');
    });
});
