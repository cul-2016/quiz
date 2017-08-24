const test = require('tape');
const generateShareId = require('../../../server/lib/generateShareId');
const query = require('../../../server/lib/query');
const queries = require('../../../server/lib/queries.json');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`generateShareId` works for a quiz', (t) => {

    t.plan(2);

    initDb()
    .then(() => {

        const expectedError = null;
        const expectedCommand = 'UPDATE';
        const quiz_id = 2;

        generateShareId(pool, quiz_id, null, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.equal(error, expectedError, 'error is null, module is saved to db correctly.');
            t.deepEqual(response.command, expectedCommand, 'Correct command of UPDATE, score is edited correctly');
        });
    });
});

test('`generateShareId` works for a survey', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const expectedError = null;
        const expectedCommand = 'UPDATE';
        const survey_id = 2;

        generateShareId(pool, null, survey_id, (error, response) => {

            if (error) {
                console.error(error);
            }
            t.equal(error, expectedError, 'error is null, module is saved to db correctly.');
            t.deepEqual(response.command, expectedCommand, 'Correct command of UPDATE, score is edited correctly');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
