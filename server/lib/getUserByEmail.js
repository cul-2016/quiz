var query = require('./query');

/**
 * Represents a function that returns user details by email
 * @param {object} client - postgres database client
 * @param {string} email - email for the given user
 * @param {function} callback - a callback function
 */
function getUserByEmail (client, email, callback) {

    // var userQuery = 'SELECT * FROM users WHERE email = $1;';
    var userValue = [email];

    var userQuery = `SELECT users.*, account_management.account_type,
    account_management.paid FROM users LEFT JOIN account_management ON
    users.email = account_management.email WHERE users.email = $1`;

    query(client, userQuery, userValue, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = getUserByEmail;
