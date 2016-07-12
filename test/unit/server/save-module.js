import test from 'tape';
import { testClient } from '../../utils/init';
import saveModule from '../../../server/lib/save-module';

test('adding a module to the database works ok', (t) => {

    t.plan(2);
    const expectedError = null; // testing if the error is null so that the client has saved user correctly.
    const expectedCommand = 'INSERT';
    const module_id = "MOD1";
    const user_id = 1;
    const name = "Test Module";
    const medals = {
        medal_name: [
            "bronze",
            "silver",
            "gold"
        ],
        condition: [39, 69, 100]
    };
    const trophies = {
        trophy_name: [
            "participation",
            "overall_average",
            "full_marks",
            "first_quiz"
        ],
        condition: [3, 60, 100, 1]
    };
    saveModule(module_id, user_id, name, medals, trophies, (error, response) => {

        t.deepEquals(error, expectedError, 'error is null, module is saved to db correctly.');
        t.deepEquals(response.command, expectedCommand, 'Correct command of INSERT, module is saved to db correctly');
    });
});


test('deleting lecturer from the database', (t) => {
    testClient.connect((error, client, done) => {
        if (error) {
            console.error(error, 'error from deleting module from the database');
        }

        client.query('DELETE FROM modules WHERE module_id = $1', ['MOD1']);
        done();
        t.end();
    });
});
