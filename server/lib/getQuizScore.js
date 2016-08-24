var query = require('./query');
var queries = require('./queries.json');

/**
 * Gets a student's raw and percentage score for a quiz
 * Returns an object containing the raw score and percentage score
 * @param {object} client - postgres database client
 * @param {number} user_id - user id
 * @param {number} quiz_id - quiz id
 * @param {function} callback - a callback function
 */

function getQuizScore (client, user_id, quiz_id, callback) {

    var values = [user_id, quiz_id];

    query(client, queries.getQuizScore.score, values, (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        var score = parseInt(response.rows[0].count, 10);

        query(client, queries.getQuizScore.num_questions, [quiz_id], (error, result) => {

            if (error) {
                throw new Error("Problem getting number of questions");
            }
            const num_questions = result.rows[0].count;
            const data = {
                raw: score,
                percentage: Math.round((score / num_questions) * 100)
            };
            callback(null, data);
        });
    });
}

module.exports = getQuizScore;
