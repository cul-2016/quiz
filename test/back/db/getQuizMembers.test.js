const test = require('tape');
const getQuizMembers = require('../../../server/lib/getQuizMembers');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getQuizMembers` get list of student participants in a quiz', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const quiz_id = 1;
        const isSurvey = false;
        const expectedRows = [
            { email: 'homer@simpsons.com', score: 2, user_id: 5, username: 'Homer' },
            { email: 'mina@city.ac.uk', score: 0, user_id: 4, username: 'Mina' },
            { email: 'sohil@city.ac.uk', score: 1, user_id: 3, username: 'Sohil' },
            { email: 'student@city.ac.uk', score: 2, user_id: 1, username: 'student' }
        ];

        getQuizMembers(pool, quiz_id, isSurvey, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEquals(response, expectedRows, 'correct number of students for the quiz');
        });

    });
});

test('`getQuizMembers` get list of student participants in a survey', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const survey_id = 1;
        const isSurvey = true;
        const expectedRows = [
            { email: 'student@city.ac.uk', user_id: 1, username: 'student' },
            { email: 'lecturer@city.ac.uk', user_id: 2, username: 'lecturer' },
            { email: 'sohil@city.ac.uk', user_id: 3, username: 'Sohil' },
            { email: 'mina@city.ac.uk', user_id: 4, username: 'Mina' }
        ];

        getQuizMembers(pool, survey_id, isSurvey, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEquals(response, expectedRows, 'correct number of students for the survey');
        });

    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
