const test = require('tape');
const getQuizDetailsStudent = require('../../../server/lib/getQuizDetailsStudent');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);


test('`getQuizDetailsStudent` gets questions, answers and student answers for a given quiz', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const user_id = 1;
        const quiz_id = 2;
        const expectedRows = [{
            question: 'What is the National Animal of England?',
            a: 'Pikachu',
            b: 'Whale',
            c: 'Lion',
            d: 'Doncaster',
            correct_answer: 'c',
            response: 'b'
        }, {
            question: 'What is the capital of Tanzania?',
            a: 'Zagreb',
            b: 'Dodoma',
            c: 'Edinburgh',
            d: 'Doncaster',
            correct_answer: 'b',
            response: 'b'
        }];
        getQuizDetailsStudent(pool, quiz_id, user_id, (error, response) => {
            if (error) {
                console.error(error);
                t.error(error, 'should not have errored!');
            }
            t.deepEqual(response, expectedRows, 'database returns correct quiz details');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
