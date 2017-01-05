const test = require('tape');
const getIsLastQuiz = require('../../../server/lib/getIsLastQuiz');
const { testClient } = require('../../utils/init');

test('`getIsLastQuiz` Gets is_last_quiz for a given quiz', (t) => {

    t.plan(1);
    const expected = false;
    const quiz_id = 1;
    getIsLastQuiz(testClient, quiz_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expected, 'database returns correct value');
    });
});
