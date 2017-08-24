var query = require('./query');

/**
 * Represents a function that returns user details by email
 * @param {object} client - postgres database client
 * @param {string} email - email for the given user
 * @param {function} callback - a callback function
 */
function getUserByEmail (client, email, callback) {

    var userQuery = 'SELECT * FROM users WHERE email = $1;';
    var userValue = [email];

    query(client, userQuery, userValue, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = getUserByEmail;
