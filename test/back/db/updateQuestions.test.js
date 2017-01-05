const test = require('tape');
const updateQuestions = require('../../../server/lib/updateQuestions');
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`updateQuestions` works', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const expectedError = null;
        const expectedCommand = 'INSERT';
        const editedQuestions = [
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

        updateQuestions(pool, editedQuestions, (error, response) => {
            t.deepEquals(error, expectedError, 'error is null, quiz name updated correctly');
            t.deepEquals(response.command, expectedCommand, 'Correct command of UPDATE');
        });
    });
});


test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
