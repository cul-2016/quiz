const test = require('tape');
const getReview = require('../../../server/lib/getReview.js');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getQuizReview` gets list of questions for a quiz review', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
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
                correct_answer: 'a',
                order_id: 1
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
                correct_answer: 'a',
                order_id: 2
            }];
        const quiz_id = 1;
        const isSurvey = false;
        getReview(pool, quiz_id, isSurvey, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEqual(response, expectedRows, 'database returns the review');
        });
    });
});

test('`getQuizReview` gets list of questions for a quiz review', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const expectedRows = [
            {
                question_id: 32,
                survey_id: 1,
                question: 'How do you feel about this module?',
                a: 'Bad',
                b: 'Not interested',
                c: 'Good',
                d: 'Mind blown',
                a_responses: '2',
                b_responses: '0',
                c_responses: '1',
                d_responses: '1',
                correct_answer: null,
                order_id: 1
            },
            {
                question_id: 33,
                survey_id: 1,
                question: 'Would you recommend this lecturer?',
                a: 'No',
                b: 'Yes',
                a_responses: '1',
                b_responses: '2',
                c_responses: '0',
                d_responses: '0',
                correct_answer: null,
                order_id: 2
            }
        ];
        const survey_id = 1;
        const isSurvey = true;
        getReview(pool, survey_id, isSurvey, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEqual(response, expectedRows, 'database returns the review');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
