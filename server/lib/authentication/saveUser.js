var query = require('../query');

/**
* Represents a function that saves a user to the database.
* @param {Object} db - database client to which the function will need to connect to.
* @param {string} email - email for the given user
* @param {string} password - password for the given user
* @param {Boolean} is_lecturer - indicaes whether the user is a lecturer or student
* @param {string} username - username for the given student or lecturer
* @param {string} verification_code - uuid code necessary for verification url sent via email
* @param {Function} callback - callback function.
*/
function saveUser (pool, email, password, is_lecturer, username, verification_code, callback) {
    var userQuery;
    var userArray;
    if (is_lecturer) {
        userQuery = 'INSERT INTO users (email, password, is_lecturer, username, verification_code) VALUES ( $1, $2, $3, $4, $5 );';
        userArray = [email, password, is_lecturer, username, verification_code];
    } else {
        userQuery = 'INSERT INTO users (email, password, username, is_verified) VALUES ( $1, $2, $3, $4);';
        userArray = [email, password, username, true];
    }
    query(pool, userQuery, userArray, (error, result) => {
        /* istanbul ignore if */
        if (error) {
            callback(error);
        }
        callback(null, result);
    });
}

module.exports = saveUser;
