var query = require('./query');
var queries = require('./queries.json');

/**
 * Gets a student's result in a quiz
 * @param {object} client - postgres database client
 * @param {number} user_id - user id
 * @param {number} quiz_id - quiz id
 * @param {function} callback - a callback function
 */

function getQuizResult (client, user_id, quiz_id, callback) {

    var values = [user_id, quiz_id];

    query(client, queries.getQuizResult, values, (error, response) => {

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

module.exports = getQuizResult;
