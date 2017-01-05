const test = require('tape');
const { testClient } = require('../../utils/init');
const updateQuiz = require('../../../server/lib/updateQuiz');

test('`updateQuiz` works', (t) => {

    t.plan(2);

    const expectedError = null;
    const expectedCommand = 'UPDATE';
    const quiz_id = 1;
    const module_id = 'TEST';
    const name = 'Updated Name';
    const is_last_quiz = true;

    updateQuiz(testClient, module_id, quiz_id, name, is_last_quiz, (error, response) => {

        t.deepEqual(error, expectedError, 'error is null, quiz name updated correctly');
        t.deepEqual(response.command, expectedCommand, 'Correct command of UPDATE');
    });
});
