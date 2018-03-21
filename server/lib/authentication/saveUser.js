var query = require('../query');

/**
* Represents a function that saves a user to the database.
* @param {Object} db - database client to which the function will need to connect to.
* @param {string} email - email for the given user
* @param {string} password - password for the given user
* @param {Boolean} is_lecturer - indicaes whether the user is a lecturer or student
* @param {string} username - username for the given student or lecturer
* @param {string} group_code - code which associates a lecturer to a particular group (e.g. a university department)
* @param {string} verification_code - uuid code necessary for verification url sent via email
* @param {string} is_group_admin - boolean denoting whether the user is a group_admin or not
* @param {Function} callback - callback function.
*/
function saveUser (pool, email, password, is_lecturer, username, group_code, verification_code, is_group_admin, callback) {
    var userQuery;
    var userArray;
    if (is_lecturer) {
        var expiry = Date.now() + (91 * 24 * 60 * 60 * 1000); // 3 Month Trial
        userQuery = 'INSERT INTO users (email, password, is_lecturer, username, group_code, verification_code, is_group_admin, trial_expiry_time) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 );';
        userArray = [email, password, is_lecturer, username, group_code, verification_code, is_group_admin, expiry];
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
