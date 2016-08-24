var query = require('./query');
var queries = require('./queries.json');

/**
 * Gets a student's raw and percentage score for a quiz
 * @param {object} client - postgres database client
 * @param {number} user_id - user id
 * @param {number} quiz_id - quiz id
 * @param {function} callback - a callback function
 */

function getQuizScore (client, user_id, quiz_id, callback) {

    var values = [user_id, quiz_id];

    query(client, queries.getQuizScore, values, (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        const data = {
            score: parseInt(response.rows[0].count, 10)
        };
        callback(null, data);
    });
}

module.exports = getQuizScore;
