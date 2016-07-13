var query = require('./query');
/**
* Represents a function that saves a user to the database.
* @param {Object} db - database client to which the function will need to connect to.
* @param {string} email - email for the given user
* @param {string} password - password for the given user
* @param {Boolean} is_lecturer - indicaes whether the user is a lecturer or student
* @param {string} username - username for the given student. Lecturer will not have the username and it will be an empty string
* @param {Function} callback - callback function.
*/
function saveUser (pool, email, password, is_lecturer, username, callback) {
    var userQuery;
    var userArray;
    if (is_lecturer) {
        userQuery = 'INSERT INTO users (email, password, is_lecturer) VALUES ( $1, $2, $3 );';
        userArray = [email, password, is_lecturer];
    } else {
        userQuery = 'INSERT INTO users (email, password, username) VALUES ( $1, $2, $3);';
        userArray = [email, password, username];
    }
    query(pool, userQuery, userArray, (error, result) => {
        if (error) {
            callback(error);
        }

        callback(null, result);
    });
}

module.exports = saveUser;
