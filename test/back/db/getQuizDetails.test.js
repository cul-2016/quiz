const test = require('tape');
const getQuizDetails = require('../../../server/lib/getQuizDetails');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getQuizDetails` gets quiz name and questions for a given quiz', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const expectedRows = {
            name: 'Week 1 Quiz',
            questions: [
                { question_id: 1,
                    order_id: 1,
                    question: 'What is the capital of England?',
                    a: 'London',
                    b: 'Cardiff',
                    c: 'Edinburgh',
                    d: 'Doncaster',
                    correct_answer: 'a',
                    more_information: null
                }, {
                    question_id: 2,
                    order_id: 2,
                    question: 'What is the capital of Croatia?',
                    a: 'Zagreb',
                    b: 'Cardiff',
                    c: 'Edinburgh',
                    d: 'Doncaster',
                    correct_answer: 'a',
                    more_information: null
                }
            ],
            is_last_quiz: false };
        const user_id = 1;

        getQuizDetails(pool, user_id, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEqual(response, expectedRows, 'database returns correct quiz details');
        });

    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
