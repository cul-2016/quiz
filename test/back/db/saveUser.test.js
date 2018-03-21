const uuid = require('uuid');
const test = require('tape');
const saveUser = require('../../../server/lib/authentication/saveUser');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`saveUser` successfully saves a lecturer', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const expectedError = null; // testing if the error is null so that the client has saved user correctly.
        const expectedCommand = 'INSERT';
        const verification_code = uuid();
        const group_code = '123abc';
        saveUser(pool, 'sohilpandya@me.com', 'test', true, '', group_code, verification_code, false, (error, response) => {
            t.deepEquals(error, expectedError, 'error is null, lecturer is saved to db correctly.');
            t.deepEquals(response.command, expectedCommand, 'Correct command of INSERT, lecturer is saved to db correctly');
        });
    });
});

test('`saveUser` successfully saves a student', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const expectedError = null;
        const expectedCommand = 'INSERT';
        saveUser(pool, 'teststudent@city.ac.uk', 'teststudent', false, 'teststudent', '', null, false, (error, response) => {
            t.deepEquals(error, expectedError, 'error is null, student is saved to db correctly.');
            t.deepEquals(response.command, expectedCommand, 'Correct command of INSERT, student is saved to db correctly');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
