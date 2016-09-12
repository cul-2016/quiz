import test from 'tape';
import setQuizScore from '../../../server/lib/setQuizScore';
import { testClient } from '../../utils/init';
import query from '../../../server/lib/query';


test("`setQuizScore` updates a student's score for a quiz with an existing score", (t) => {

    t.plan(1);

    const user_id = 1;
    const quiz_id = 2;
    const score = 5;
    const expected = score;

    setQuizScore(testClient, user_id, quiz_id, score, (error) => {

        if (error) {
            console.error(error);
        }
        const testQuery = "SELECT score FROM scores WHERE user_id = $1 AND quiz_id = $2;";

        query(testClient, testQuery, [user_id, quiz_id], (error, result) => {

            t.equal(result.rows[0].score, expected, 'Score saves correctly');

            const resetQuery = "UPDATE scores SET score = 1 WHERE user_id = $1 AND quiz_id = $2;";

            query(testClient, resetQuery, [user_id, quiz_id], (error) => {

                if (error) throw new Error(error);
            });
        });
    });
});
