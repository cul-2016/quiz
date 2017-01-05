const test = require('tape');
const validateModuleID = require('../../../server/lib/validateModuleID');
const { testClient } = require('../../utils/init');

test('`validateModuleID` returns true for a pre-existing module_id', (t) => {

    t.plan(2);

    const expected = true;
    const module_id = 'TEST';

    validateModuleID(testClient, module_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.ok(typeof response === 'boolean', 'validateModuleID returns a boolean');
        t.deepEqual(response, expected, 'database returns true');
    });
});

test('`validateModuleID` returns false for a pre-existing module_id', (t) => {

    t.plan(2);

    const expected = false;
    const module_id = 'NEW1';

    validateModuleID(testClient, module_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.ok(typeof response === 'boolean', 'validateModuleID returns a boolean');
        t.deepEqual(response, expected, 'database returns false');
    });
});
