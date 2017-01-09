const test = require('tape');
const getQuizQuestions = require('../../../server/lib/getQuizQuestions');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getQuizQuestions` gets list of questions for a quiz', (t) => {

    t.plan(1);

    initDb()
    .then(() => {

        const expectedRows = [
            {
                question_id: 1,
                question: 'What is the capital of England?',
                a: 'London',
                b: 'Cardiff',
                c: 'Edinburgh',
                d: 'Doncaster'
            },
            {
                question_id: 2,
                question: 'What is the capital of Croatia?',
                a: 'Zagreb',
                b: 'Cardiff',
                c: 'Edinburgh',
                d: 'Doncaster'
            }
        ];

        const quiz_id = 1;

        getQuizQuestions(pool, quiz_id, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEquals(response, expectedRows, 'database returns correct row of questions');
        });

    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});


