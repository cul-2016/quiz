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
            is_last_quiz: false,
            questions: [
                {
                    a: 'London',
                    b: 'Cardiff',
                    c: 'Edinburgh',
                    correct_answer: 'a',
                    d: 'Doncaster',
                    question: 'What is the capital of England?',
                    question_id: 1
                },
                {
                    a: 'Zagreb',
                    b: 'Cardiff',
                    c: 'Edinburgh',
                    correct_answer: 'a',
                    d: 'Doncaster',
                    question: 'What is the capital of Croatia?',
                    question_id: 2
                }
            ]
        };
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


