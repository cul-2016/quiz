var query = require('./query');
var queries = require('./queries.json');

/**
 * Represents a function that get a history of a student's quiz performance
 * @param {object} client - postgres database client
 * @param {number} user_id - user id for a student
 * @param {string} module_id - the module id
 * @param {function} callback - a callback function
 */

function getStudentHistory (client, user_id, module_id, callback) {

    var queryText = queries.getStudentHistory;
    var values = [user_id, module_id];

    query(client, queryText, values, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = getStudentHistory;
