var query = require('./query');

/**
 * Represents a function that returns user details
 * @param {object} client - postgres database client
 * @param {string} email - email for the given user
 * @param {function} callback - a callback function
 */
function getUser (client, email, callback) {

    var userQuery = 'SELECT * FROM users WHERE email = $1;';
    var userValue = [email];

    query(client, userQuery, userValue, (error, response) => {

        if (error) {
            console.error(error);
            callback(error);
        }
        callback(null, response.rows);
    });
}

module.exports = getUser;
