const test = require('tape');
const composeQuestionStatement = require('../../../server/lib/composeQuestionStatement');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('composeQuestionStatement returns the correctly formatted object (quiz)', (t) => {
    t.plan(1);

    initDb()
    .then(() => {
        const quiz_id = 1;
        const arrayQuestions = [
            {
                order_id: 1,
                question: 'One',
                a: 'a',
                b: 'b',
                c: 'c',
                d: 'd',
                correct_answer: 'a',
                more_information: null },
            {
                order_id: 2,
                question: 'Two',
                a: 'a',
                b: 'b',
                c: 'c',
                d: 'd',
                correct_answer: 'b',
                more_information: null
            }];

        const expected = {
            text: 'INSERT INTO questions (quiz_id, order_id, question, a, b, c, d, correct_answer, more_information) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9), ($10, $11, $12, $13, $14, $15, $16, $17, $18)',
            values: [1, 1, 'One', 'a', 'b', 'c', 'd', 'a', null, 1, 2, 'Two', 'a', 'b', 'c', 'd', 'b', null]
        };
        composeQuestionStatement(quiz_id, arrayQuestions, { is_survey: false }, (error, response) => {
            t.deepEqual(response, expected);
        });
    });
});

test('composeQuestionStatement returns the correctly formatted object (survey)', (t) => {
    t.plan(1);

    initDb()
    .then(() => {
        const survey_id = 1;
        const arrayQuestions = [
            {
                order_id: 1,
                question: 'One',
                a: 'a',
                b: 'b',
                c: 'c',
                d: 'd',
                correct_answer: 'a',
                more_information: null
            },
            {
                order_id: 2,
                question: 'Two',
                a: 'a',
                b: 'b',
                c: 'c',
                d: 'd',
                correct_answer: 'b',
                more_information: null
            }];

        const expected = {
            text: 'INSERT INTO questions (quiz_id, order_id, question, a, b, c, d, correct_answer, more_information) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9), ($10, $11, $12, $13, $14, $15, $16, $17, $18)',
            values: [1, 1, 'One', 'a', 'b', 'c', 'd', 'a', null, 1, 2, 'Two', 'a', 'b', 'c', 'd', 'b', null]
        };
        composeQuestionStatement(survey_id, arrayQuestions, { is_survey: true }, (error, response) => {
            t.deepEqual(response, expected);
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
