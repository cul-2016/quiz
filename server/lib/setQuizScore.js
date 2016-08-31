var query = require('./query');
var queries = require('./queries.json');

/**
 * Sets a student's raw score for a quiz
 * @param {object} client - postgres database client
 * @param {number} user_id - user id
 * @param {number} quiz_id - quiz id
 * @param {number} score - student's quiz score
 * @param {function} callback - a callback function
 */

function setQuizScore (client, user_id, quiz_id, score, callback) {

    var values = [user_id, quiz_id, score];

    query(client, queries.setQuizScore, values, (error) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null);
    });
}

module.exports = setQuizScore;
