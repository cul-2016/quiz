var query = require('../query');

/**
 * Represents a function that updates a users is_active column
 * @param {object} client - postgres database client
 * @param {number} user_id - user id for a given user
 * @param {function} callback - a callback function
 */

function updateIsUserActive (client, user_id, callback) {
    var queryText = 'UPDATE users SET is_user_active = NOT is_user_active WHERE user_id = $1 returning is_user_active';
    var queryArray = [user_id];

    query(client, queryText, queryArray, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error("`updateIsUserActive`", error);
            return callback(error);
        }
        return callback(null, response.rows[0]);
    });
}

module.exports = updateIsUserActive;
