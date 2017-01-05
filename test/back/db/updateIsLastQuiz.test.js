const test = require('tape');
const { pool } = require('../../utils/init');
const updateIsLastQuiz = require('../../../server/lib/updateIsLastQuiz');

test('`updateIsLastQuiz` updating is_last_quiz to false works', (t) => {

    t.plan(2);
    const expectedError = null;
    const expectedCommand = 'UPDATE';
    const quiz_id = 1;
    const module_id = 'TEST';
    updateIsLastQuiz(pool, module_id, quiz_id, (error, response) => {
        t.deepEquals(error, expectedError, 'error is null, is_last_quiz is updated correctly');
        t.deepEquals(response.command, expectedCommand, 'Correct command of UPDATE');
    });
});
