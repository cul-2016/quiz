import test from 'tape';
import editScore from '../../../server/lib/editScore';
import { testClient } from '../../utils/init';
import query from '../../../server/lib/query';
import queries from '../../../server/lib/queries.json';


test('`editScore` works', (t) => {

    t.plan(2);

    const expectedError = null;
    const expectedCommand = 'UPDATE';

    const user_id = 1;
    const quiz_id = 2;
    const score = 2;
    const originalScore = 1; // reset the value after test

    editScore(testClient, user_id, quiz_id, score, (error, response) => {

        if (error) {
            console.error(error);
        }
        query(testClient, queries.editScore, [user_id, quiz_id, originalScore], (error) => {

            if (error) {
                throw error;
            }
            console.log("CHANGED IT BACK!");
            t.equal(error, expectedError, 'error is null, module is saved to db correctly.');
            t.deepEqual(response.command, expectedCommand, 'Correct command of UPDATE, score is edited correctly');
        });
    });
});
