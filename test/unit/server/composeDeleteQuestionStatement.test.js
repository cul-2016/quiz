import test from 'tape';
import composeDeleteQuestionStatement from '../../../server/lib/composeDeleteQuestionStatement';



test('composeDeleteQuestionStatement returns the correctly formatted object', (t) => {
    t.plan(1);
    const deletedQuestions = [1, 2];
    const expected = { text: 'DELETE FROM questions WHERE question_id IN ($1, $2);', values: [1, 2] };

    composeDeleteQuestionStatement(deletedQuestions, (error, response) => {
        t.deepEqual(response, expected);

    });
});
