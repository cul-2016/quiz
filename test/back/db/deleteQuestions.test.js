const test = require('tape');
const deleteQuestions = require('../../../server/lib/deleteQuestions.js');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`deleteQuestions` works', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const expectedError = null;
        const expectedCommand = 'DELETE';
        const question_id = [5];

        deleteQuestions(pool, question_id, (error, response) => {
            t.equal(error, expectedError, 'error is null, question is deleted from the db correctly.');
            t.deepEqual(response.command, expectedCommand, 'Correct command of DELETE, question is deleted from quiz');

            pool.connect((error, client, done) => {
                if (error) {
                    console.error(error);
                }
                client.query("INSERT INTO questions (quiz_id, question, a, b, c, d, correct_answer) VALUES (2, 'Have I Got News For', 'Her', 'You', 'It', 'Them', 'b')", (error) => {
                    if (error) throw new Error(error);
                    done();
                });
            });
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});


