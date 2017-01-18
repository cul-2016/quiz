const test = require('tape');
const setQuizOrSurveyToPresented = require('../../../server/lib/setQuizOrSurveyToPresented');
const query = require('../../../server/lib/query');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('setQuizToPresented updates a quiz\'s `is_presented` column value', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const id = 1;
        const isSurvey = false;
        const expectedRows = [{ is_presented: true }];

        setQuizOrSurveyToPresented(pool, id, isSurvey, (error) => {

            if (error) {
                console.error(error);
            }
            const queryText = "SELECT is_presented FROM quizzes WHERE quiz_id = $1";
            query(pool, queryText, [1], (error, result) => {

                t.notOk(error, 'Function executed without error');
                t.deepEqual(result.rows, expectedRows, "is_presented now set to true");
            });
        });
    });
});

test('setSurveyToPresented updates a quiz\'s `is_presented` column value', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const id = 1;
        const isSurvey = false;
        const expectedRows = [{ is_presented: true }];

        setQuizOrSurveyToPresented(pool, id, isSurvey, (error) => {

            if (error) {
                console.error(error);
            }
            const queryText = "SELECT is_presented FROM surveys WHERE survey_id = $1";
            query(pool, queryText, [1], (error, result) => {

                t.notOk(error, 'Function executed without error');
                t.deepEqual(result.rows, expectedRows, "is_presented now set to true");
            });
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
