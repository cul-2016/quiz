var query = require('./query');

/**
 * Represents a function that saves new quiz and returns quiz_id for the saved quiz
 * @param {object} client - postgres database client
 * @param {string} email - email for the given user
 * @param {string} reset_password_code - unique code provided when resetting the password
 * @param {timestamp} code_expiry - timestamp of when the code expires
 * @param {function} callback - a callback function
 */

function saveExpiringTokenForUser (client, email, reset_password_code, code_expiry, callback) {

    var queryText = 'UPDATE users SET (reset_password_code, code_expiry) = ($1, $2) WHERE email = $3 RETURNING email, username;';
    var value = [reset_password_code, code_expiry, email];

    query(client, queryText, value, (error, response) => {

        if (error) {
            return callback(error);
        }
        return callback(null, response.rows[0]);
    });
}

module.exports = saveExpiringTokenForUser;
