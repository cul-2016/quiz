const test = require('tape');
const composeQuestionStatement = require('../../../server/lib/composeQuestionStatement');

test('composeQuestionStatement returns the correctly formatted object', (t) => {
    t.plan(1);
    const arrayQuestions = [
        {
            quiz_id: 1,
            question: 'One',
            a: 'a',
            b: 'b',
            c: 'c',
            d: 'd',
            correct_answer: 'a' },
        {
            quiz_id: 1,
            question: 'Two',
            a: 'a',
            b: 'b',
            c: 'c',
            d: 'd',
            correct_answer: 'b'
        }];

    const expected = {
        text: 'INSERT INTO questions (quiz_id, question, a, b, c, d, correct_answer) VALUES ($1, $2, $3, $4, $5, $6, $7), ($8, $9, $10, $11, $12, $13, $14)',
        values: [1, 'One', 'a', 'b', 'c', 'd', 'a', 1, 'Two', 'a', 'b', 'c', 'd', 'b']
    };
    composeQuestionStatement(arrayQuestions, (error, response) => {
        t.deepEqual(response, expected);

    });
});
