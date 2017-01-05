const test = require('tape');
const { testClient } = require('../../utils/init');
const saveQuiz = require('../../../server/lib/saveQuiz');

test('`saveQuiz` returns the quiz id for the saved quiz', (t) => {

    t.plan(1);

    const expected = 10;
    const module_id = 'TEST';
    const name = 'Week 1 Test';
    const is_last_quiz = true;

    saveQuiz(testClient, module_id, name, is_last_quiz, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expected);
    });
});
