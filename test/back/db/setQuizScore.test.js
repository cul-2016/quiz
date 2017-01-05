const test = require('tape');
const setQuizScore = require('../../../server/lib/setQuizScore');
const { testClient } = require('../../utils/init');
const query = require('../../../server/lib/query');

test("`setQuizScore` updates a student's score for a quiz with an existing score", (t) => {

    t.plan(2);

    const user_id = 1,
        quiz_id = 2,
        score = 5,
        expected = score,
        expectedlength = 1;

    setQuizScore(testClient, user_id, quiz_id, score, (error) => {

        if (error) {
            console.error(error);
        }
        const testQuery = "SELECT score FROM scores WHERE user_id = $1 AND quiz_id = $2;";

        query(testClient, testQuery, [user_id, quiz_id], (error, result) => {
            t.equal(result.rows.length, expectedlength, 'There is only one score for the given user');
            t.equal(result.rows[0].score, expected, 'Score saves correctly');

            const resetQuery = "UPDATE scores SET score = 1 WHERE user_id = $1 AND quiz_id = $2;";

            query(testClient, resetQuery, [user_id, quiz_id], (error) => {

                if (error) throw error;
            });
        });
    });
});
