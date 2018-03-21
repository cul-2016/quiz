var query = require('../query');

/**
 * Represents a function that retrieves all lectures belonging to a group code
 * @param {object} client - postgres database client
 * @param {string} group_code - code which associates a lecturer to a particular group (e.g. a university department)
 * @param {function} callback - a callback function
 */

function getLecturersByGroupCode (client, group_code, callback) {
    var queryText = 'SELECT user_id, email, is_verified, is_user_active FROM users WHERE group_code = $1';
    var queryArray = [group_code];

    query(client, queryText, queryArray, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error("`getLecturersByGroupCode`", error);
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = getLecturersByGroupCode;
