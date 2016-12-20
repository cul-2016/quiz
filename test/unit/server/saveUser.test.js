import uuid from 'uuid';
import test from 'tape';
import { testClient } from '../../utils/init';
import saveUser from '../../../server/lib/authentication/saveUser';

test('`saveUser` successfully saves a lecturer', (t) => {

    t.plan(2);
    const expectedError = null; // testing if the error is null so that the client has saved user correctly.
    const expectedCommand = 'INSERT';
    const verification_code = uuid();
    saveUser(testClient, 'sohilpandya@me.com', 'test', true, '', verification_code, (error, response) => {
        t.deepEquals(error, expectedError, 'error is null, lecturer is saved to db correctly.');
        t.deepEquals(response.command, expectedCommand, 'Correct command of INSERT, lecturer is saved to db correctly');
    });
});

test('`saveUser` successfully saves a student', (t) => {

    t.plan(2);
    const expectedError = null;
    const expectedCommand = 'INSERT';
    saveUser(testClient, 'teststudent@city.ac.uk', 'teststudent', false, 'teststudent', null, (error, response) => {
        t.deepEquals(error, expectedError, 'error is null, student is saved to db correctly.');
        t.deepEquals(response.command, expectedCommand, 'Correct command of INSERT, student is saved to db correctly');
    });
});

test('---deleting lecturer from the database---', (t) => {

    testClient.connect((error, client, done) => {
        if (error) {
            console.error(error, 'error from deleting lecturer from the database');
        }
        client.query('DELETE FROM users WHERE email = $1', ['sohilpandya@me.com']);
        client.query('DELETE FROM users WHERE email = $1', ['teststudent@city.ac.uk']);
        done();
        t.end();
    });
});
