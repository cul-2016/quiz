var query = require('../query');

/**
 * Represents a function that updates group_admin_has_paid column for all users that have a matching group_code
 * @param {object} client - postgres database client
 * @param {boolean} paid - boolean value representing if the admin has paid.
 * @param {string} group_code - code which associates a lecturer to a particular group (e.g. a university department)
 * @param {function} callback - a callback function
 */

function updateGroupLecturerPaidColumn (client, paid, group_code, callback) {

    var queryText = 'UPDATE users SET group_admin_has_paid = $1 WHERE group_code = $2 RETURNING users.user_id;';

    var value = [paid, group_code];

    query(client, queryText, value, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = updateGroupLecturerPaidColumn;
