const test = require('tape');
const updateQuizOrSurvey = require('../../../server/lib/updateQuizOrSurvey.js');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`updateQuiz` works', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const expectedError = null;
        const expectedCommand = 'UPDATE';
        const quiz_id = 1;
        const module_id = 'TEST';
        const name = 'Updated Name';
        const is_last_quiz = true;
        let survey_id;
        updateQuizOrSurvey(pool, module_id, quiz_id, survey_id, name, is_last_quiz, (error, response) => {

            t.deepEqual(error, expectedError, 'error is null, quiz name updated correctly');
            t.deepEqual(response.command, expectedCommand, 'Correct command of UPDATE');
        });
    });
});

test('`updateSurvey` works', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const expectedError = null;
        const expectedCommand = 'UPDATE';
        const survey_id = 1;
        const module_id = 'TEST';
        const name = 'Updated Name';
        const is_last_quiz = true;
        let quiz_id;
        updateQuizOrSurvey(pool, module_id, quiz_id, survey_id, name, is_last_quiz, (error, response) => {

            t.deepEqual(error, expectedError, 'error is null, quiz name updated correctly');
            t.deepEqual(response.command, expectedCommand, 'Correct command of UPDATE');
        });
    });
});


test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
