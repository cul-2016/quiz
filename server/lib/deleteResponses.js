var query = require('./query');
var queries = require('./queries.json');

/**
 * Represents a function that deletes all responses related to a quiz
 * @param {object} client - postgres database client
 * @param {number} quiz_id - quiz id
 * @param {function} callback - a callback function
 */

function deleteResponses (client, quiz_id, callback) {

    var moduleValue = [quiz_id];

    query(client, queries.deleteResponses, moduleValue, (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        return callback(null, response);
    });
}

module.exports = deleteResponses;
