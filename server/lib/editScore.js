var query = require('./query');
var queries = require('./queries.json');

/**
 * Represents a function that updates an existing score for a user
 * @param {object} client - postgres database client
 * @param {number} user_id - user id for a student
 * @param {number} quiz_id - quiz id to which the student will belong to
 * @param {number} score - score which needs to be updated in the database
 * @param {function} callback - a callback function
 */

function editScore (client, user_id, quiz_id, score, callback) {

    var queryText = queries.editScore;
    var values = [user_id, quiz_id, score];

    query(client, queryText, values, (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        return callback(null, response);
    });
}

module.exports = editScore;
