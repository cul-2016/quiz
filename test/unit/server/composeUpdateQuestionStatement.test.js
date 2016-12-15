import test from 'tape';
import composeUpdateQuestionStatement from '../../../server/lib/composeUpdateQuestionStatement';



test('composeUpdateQuestionStatement returns the correctly formatted object', (t) => {
    t.plan(1);
    const arrayQuestions = [
        {
            question_id: 2,
            question: 'What is the capital of Croatia?',
            a: 'Zagreb',
            b: 'Cardiff',
            c: 'Edinburgh',
            d: 'Doncaster',
            correct_answer: 'a',
            quiz_id: '1'
        },
        {
            question_id: 1,
            question: 'What is the capital of England?',
            a: 'London',
            b: 'Cardiff',
            c: 'Edinburgh',
            d: 'Doncaster',
            correct_answer: 'a',
            quiz_id: '1'
        }
    ];
    const expected = { text: 'INSERT INTO questions (question_id, quiz_id, question, a, b, c, d, correct_answer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8), ($9, $10, $11, $12, $13, $14, $15, $16)ON CONFLICT (question_id) DO UPDATE SET question = EXCLUDED.question, a = EXCLUDED.a, b = EXCLUDED.b, c = EXCLUDED.c, d = EXCLUDED.d, correct_answer = EXCLUDED.correct_answer;', values: [2, '1', 'What is the capital of Croatia?', 'Zagreb', 'Cardiff', 'Edinburgh', 'Doncaster', 'a', 1, '1', 'What is the capital of England?', 'London', 'Cardiff', 'Edinburgh', 'Doncaster', 'a'] };
    composeUpdateQuestionStatement(arrayQuestions, (error, response) => {
        t.deepEqual(response, expected);

    });
});
