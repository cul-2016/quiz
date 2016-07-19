var query = require('./query');

/**
 * Represents a function that returns user details by user_id
 * @param {object} client - postgres database client
 * @param {string} user_id - user_id for the given user
 * @param {function} callback - a callback function
 */
function getUserByID (client, user_id, callback) {

    var userQuery = 'SELECT * FROM users WHERE user_id = $1;';
    var userValue = [user_id];

    query(client, userQuery, userValue, (error, response) => {

        if (error) {
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = getUserByID;
