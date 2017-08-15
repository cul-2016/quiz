const test = require('tape');
const getSurveyQuestions = require('../../../server/lib/getSurveyQuestions');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getSurveyQuestions` gets list of questions for a quiz', (t) => {

    t.plan(1);

    initDb()
    .then(() => {

        const expectedRows = [
            {
                a: 'Bad',
                b: 'Not interested',
                c: 'Good',
                d: 'Mind blown',
                question: 'How do you feel about this module?',
                question_id: 32,
                order_id: 1
            },
            {
                a: 'No',
                b: 'Yes',
                question: 'Would you recommend this lecturer?',
                question_id: 33,
                order_id: 2
            }
        ];

        const quiz_id = 1;

        getSurveyQuestions(pool, quiz_id, (error, response) => {

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
