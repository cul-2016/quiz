var query = require('./query.js');

/**
 * Represents a function that returns a list of all the users
 * @param {object} client - postgres database client
 * @param {function} callback - a callback function
 */

function getAllUsers (client, callback) {
    const moduleQuery = 'SELECT user_id, email, is_lecturer, username FROM users ORDER BY email;';
    query(client, moduleQuery, [], (error, response) => {
        if (error) {
            console.error("`getAllUsers`", error);
            return callback(error);
        }
        callback(null, response.rows);
    });
}

module.exports = getAllUsers;
