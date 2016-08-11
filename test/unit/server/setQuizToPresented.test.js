import test from 'tape';
import setQuizToPresented from '../../../server/lib/setQuizToPresented';
import query from '../../../server/lib/query';
import { testClient } from '../../utils/init';

test('setQuizToPresented updates a quiz\'s `is_presented` column value', (t) => {

    t.plan(2);

    var quiz_id = 1;
    const expectedRows = [{ is_presented: true }];

    setQuizToPresented(testClient, quiz_id, (error) => {

        if (error) {
            console.error(error);
        }
        const queryText = "SELECT is_presented FROM quizzes WHERE quiz_id = $1";
        query(testClient, queryText, [1], (error, result) => {

            t.notOk(error, 'Function executed without error');
            t.deepEqual(result.rows, expectedRows, "is_presented now set to true");
        });
    });
});
