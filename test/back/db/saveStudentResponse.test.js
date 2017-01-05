const test = require('tape');
const saveStudentResponse = require('../../../server/lib/saveStudentResponse');
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`saveStudentResponse` works', (t) => {

    t.plan(2);

    initDb()
    .then(() => {        
        const expectedError = null;
        const expectedCommand = 'INSERT';
        const user_id = 1;
        const quiz_id = 1;
        const question_id = 1;
        const response = 'c';

        saveStudentResponse(pool, user_id, quiz_id, question_id, response, (error, response) => {
            t.equal(error, expectedError, 'error is null, response is saved to db correctly.');
            t.deepEqual(response.command, expectedCommand, 'Correct command of INSERT, response is saved to db correctly');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
