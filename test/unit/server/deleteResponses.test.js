import test from 'tape';
import { testClient } from '../../utils/init';
import deleteResponses from '../../../server/lib/deleteResponses';

test('`deleteResponses` works', (t) => {

    t.plan(3);
    const expectedError = null;
    const expectedCommand = 'DELETE';
    const quiz_id = 8;

    deleteResponses(testClient, quiz_id, (error, response) => {

        t.equal(error, expectedError, 'error is null, responses are deleted from the db correctly.');
        t.deepEqual(response.command, expectedCommand, 'Correct command of DELETE, responses are deleted from responses table');

        testClient.connect((error, client, done) => {
            if (error) {
                console.error(error);
            }
            client.query("SELECT * from responses WHERE quiz_id=8", (error, response) => {

                if (error) throw new Error(error);
                t.deepEqual(0, response.rows.length);
                done();
            });
        });
    });
});
