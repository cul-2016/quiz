const test = require('tape');
const getSurveyDetails = require('../../../server/lib/getSurveyDetails');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`getSurveyDetails` gets survey name and questions for a given survey', (t) => {

    t.plan(1);

    initDb()
    .then(() => {
        const expectedRows = {
            name: 'Week 1 Survey',
            questions: [
                {
                    a: 'Bad',
                    b: 'Not interested',
                    c: 'Good',
                    correct_answer: null,
                    d: 'Mind blown',
                    question: 'How do you feel about this module?',
                    question_id: 32,
                    order_id: 1,
                    more_information: null
                },
                {
                    a: 'No',
                    b: 'Yes',
                    c: null,
                    correct_answer: null,
                    d: null,
                    question: 'Would you recommend this lecturer?',
                    question_id: 33,
                    order_id: 2,
                    more_information: null
                }
            ]
        };
        const survey_id = 1;

        getSurveyDetails(pool, survey_id, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.deepEqual(response, expectedRows, 'database returns correct survey details');
        });

    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
