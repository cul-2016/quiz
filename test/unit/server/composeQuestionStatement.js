import test from 'tape';
import composeQuestionStatement from '../../../server/lib/composeQuestionStatement';



test('composeQuestionStatement returns the correctly formatted object', (t) => {
    t.plan(1);
    const arrayQuestions = [
        {
            quiz_id: 1,
            question: 'One',
            A: 'a',
            B: 'b',
            C: 'c',
            D: 'd',
            correct_answer: 'A' },
        {
            quiz_id: 1,
            question: 'Two',
            A: 'a',
            B: 'b',
            C: 'c',
            D: 'd',
            correct_answer: 'B'
        }];

    const expected = { text: 'INSERT INTO questions (quiz_id, question, A, B, C, D, correct_answer) VALUES ($1, $2, $3, $4, $5, $6, $7), ($8, $9, $10, $11, $12, $13, $14)',
      values: [1, 'One', 'a', 'b', 'c', 'd', 'A', 1, 'Two', 'a', 'b', 'c', 'd', 'B'] };
    composeQuestionStatement(arrayQuestions, (error, response) => {
        t.deepEqual(response, expected);

    });
});
