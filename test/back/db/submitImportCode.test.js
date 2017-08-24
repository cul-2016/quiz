const test = require('tape');
const { submitImportCode,
        insertSurvey,
        insertQuiz,
        insertMultipleQuestions } = require('../../../server/lib/submitImportCode');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);


test('`submitImportCode` for a correct quiz share id creates a new quiz with the same information', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const import_code = 'testingsharecodeforquiz',
            module_id = 'TEST',
            expectedError = null,
            expectedCommand = 'INSERT';

        submitImportCode(pool, import_code, module_id, (error, response) => {
            t.deepEquals(error, expectedError, 'error is null, lecturer is saved to db correctly.');
            t.deepEqual(response.command, expectedCommand, 'Correct command of INSERT, response is saved to db correctly');
        });
    });
});

test('`submitImportCode` for a correct survey share id creates a new survey with the same information', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const import_code = 'testingsharecodeforsurvey',
            module_id = 'TEST',
            expectedError = null,
            expectedCommand = 'INSERT';

        submitImportCode(pool, import_code, module_id, (error, response) => {
            t.deepEquals(error, expectedError, 'error is null, lecturer is saved to db correctly.');
            t.deepEqual(response.command, expectedCommand, 'Correct command of INSERT, response is saved to db correctly');
        });
    });
});

test('`submitImportCode` returns false for an incorrect share id', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const import_code = 'fake share code',
            module_id = 'TEST',
            expectedError = null;

        submitImportCode(pool, import_code, module_id, (error, response) => {
            t.deepEquals(error, expectedError, 'error is null, lecturer is saved to db correctly.');
            t.deepEqual(response, false, 'Correct command of INSERT, response is saved to db correctly');
        });
    });
});
