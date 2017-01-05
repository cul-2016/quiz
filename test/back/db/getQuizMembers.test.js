const test = require('tape');
const getQuizMembers = require('../../../server/lib/getQuizMembers');
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getQuizMembers` get list of student participants in a quiz', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const quiz_id = 1;
        const expectedRows = [
            { email: 'homer@simpsons.com', score: 2, user_id: 5, username: 'Homer' },
            { email: 'mina@city.ac.uk', score: 0, user_id: 4, username: 'Mina' },
            { email: 'sohil@city.ac.uk', score: 1, user_id: 3, username: 'Sohil' },
            { email: 'student@city.ac.uk', score: 2, user_id: 1, username: 'student' }
        ];

        getQuizMembers(pool, quiz_id, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEquals(response, expectedRows, 'correct number of students');
        });

    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});


