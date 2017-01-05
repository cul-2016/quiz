const test = require('tape');
const editScore = require('../../../server/lib/editScore');
const { pool } = require('../../utils/init');
const query = require('../../../server/lib/query');
const queries = require('../../../server/lib/queries.json');

test('`editScore` works', (t) => {

    t.plan(2);

    const expectedError = null;
    const expectedCommand = 'UPDATE';

    const user_id = 1;
    const quiz_id = 2;
    const score = 2;
    const originalScore = 1; // reset the value after test

    editScore(pool, user_id, quiz_id, score, (error, response) => {

        if (error) {
            console.error(error);
        }
        query(pool, queries.editScore, [user_id, quiz_id, originalScore], (error) => {

            if (error) {
                throw error;
            }
            t.equal(error, expectedError, 'error is null, module is saved to db correctly.');
            t.deepEqual(response.command, expectedCommand, 'Correct command of UPDATE, score is edited correctly');
        });
    });
});
