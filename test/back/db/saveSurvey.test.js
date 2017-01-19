const test = require('tape');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);
const saveSurvey = require('../../../server/lib/saveSurvey');


test('`saveSurvey` returns the survey id for the saved survey', (t) => {
    t.plan(1);

    initDb()
    .then(() => {
        const expected = 8;
        const module_id = 'TEST';
        const name = 'New test survey';

        saveSurvey(pool, module_id, name, (error, survey_id) => {

            if (error) {
                console.error(error);
                t.error('should not have errored');
            } else {
                t.deepEqual(survey_id, expected);
            }
        });
    });

});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
