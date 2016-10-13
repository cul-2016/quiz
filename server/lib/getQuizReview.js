var query = require('./query');
var queries = require('./queries.json');
var removeNullAnswers = require('./removeNullAnswers');

/**
 * Represents a function that fetches a list of questions that belong to a quiz_id along with all the responses for each questions
 * @param {object} client - postgres database client
 * @param {number} quiz_id - quiz id
 * @param {function} callback - a callback function
 */

function getQuizReview (client, quiz_id, callback) {

    var moduleValue = [quiz_id];

    query(client, queries.getQuizReview, moduleValue, (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, removeNullAnswers(response.rows));
    });
}

module.exports = getQuizReview;
