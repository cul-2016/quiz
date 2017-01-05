const test = require('tape');
const getQuizReview = require('../../../server/lib/getQuizReview');
const { testClient } = require('../../utils/init');

test('`getQuizReview` gets list of questions for a quiz review', (t) => {

    t.plan(1);
    const expectedRows = [
        {
            question_id: 1,
            quiz_id: 1,
            question: 'What is the capital of England?',
            a: 'London',
            b: 'Cardiff',
            c: 'Edinburgh',
            d: 'Doncaster',
            a_responses: '3',
            b_responses: '0',
            c_responses: '1',
            d_responses: '0',
            correct_answer: 'a'
        },
        {
            question_id: 2,
            quiz_id: 1,
            question: 'What is the capital of Croatia?',
            a: 'Zagreb',
            b: 'Cardiff',
            c: 'Edinburgh',
            d: 'Doncaster',
            a_responses: '2',
            b_responses: '1',
            c_responses: '1',
            d_responses: '0',
            correct_answer: 'a'
        }];
    const quiz_id = 1;

    getQuizReview(testClient, quiz_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEqual(response, expectedRows, 'database returns the review');
    });
});
