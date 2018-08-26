var query = require('./query');

/**
 * Represents a function that returns user details by moodle_id
 * @param {object} client - postgres database client
 * @param {string} moodle_id - moodle_id for the given user
 * @param {function} callback - a callback function
 */
function getUserByMoodleID (client, moodle_id, callback) {

    var userQuery = 'SELECT * FROM users WHERE moodle_id = $1;';
    var userValue = [moodle_id];

    query(client, userQuery, userValue, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = getUserByMoodleID;
