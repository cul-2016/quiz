import test from 'tape';
import composeQuestionStatement from '../../../server/lib/composeQuestionStatement';



test('composeQuestionStatement returns the correctly formatted object (quiz)', (t) => {
    t.plan(1);
    const quiz_id = 1;
    const arrayQuestions = [
        {
            question: 'One',
            a: 'a',
            b: 'b',
            c: 'c',
            d: 'd',
            correct_answer: 'a' },
        {
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
    composeQuestionStatement(quiz_id, arrayQuestions, { isSurvey: false }, (error, response) => {
        t.deepEqual(response, expected);

    });
});

test('composeQuestionStatement returns the correctly formatted object (quiz)', (t) => {
    t.plan(1);
    const survey_id = 1;
    const arrayQuestions = [
        {
            question: 'One',
            a: 'a',
            b: 'b',
            c: 'c',
            d: 'd',
            correct_answer: 'a' },
        {
            question: 'Two',
            a: 'a',
            b: 'b',
            c: 'c',
            d: 'd',
            correct_answer: 'b'
        }];

    const expected = {
        text: 'INSERT INTO questions (survey_id, question, a, b, c, d, correct_answer) VALUES ($1, $2, $3, $4, $5, $6, $7), ($8, $9, $10, $11, $12, $13, $14)',
        values: [1, 'One', 'a', 'b', 'c', 'd', null, 1, 'Two', 'a', 'b', 'c', 'd', null]
    };
    composeQuestionStatement(survey_id, arrayQuestions, { isSurvey: true }, (error, response) => {
        t.deepEqual(response, expected);

    });
});
