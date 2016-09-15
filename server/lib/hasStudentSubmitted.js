var query = require('./query');
var queries = require('./queries.json');

/**
 * Function to determine if a student has submitted for a quiz in the past
 * Returns true if responses exist for this student; false if not.
 * @param {object} client - postgres database client
 * @param {number} user_id - user id
 * @param {number} module_id - module id
 * @param {function} callback - a callback function
 */


function hasStudentSubmitted (client, user_id, module_id, callback) {

    query(client, queries.hasStudentSubmitted, [user_id, module_id], (error, data) => {

        if (error) {
            return callback(error);
        }
        callback(null, data.rows.length > 0);
    });
}

module.exports = hasStudentSubmitted;
