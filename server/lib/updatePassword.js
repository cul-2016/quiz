var query = require('./query');

/**
 * Represents a function that updates the password for a given user and deletes the expiry_code and reset_password_code
 * @param {object} client - postgres database client
 * @param {string} reset_password_code - reset password code for a student
 * @param {number} hashedPassword - hashedPassword for a user
 * @param {function} callback - a callback function
 */

function updatePassword (client, reset_password_code, hashedPassword, callback) {

    var queryText = 'UPDATE users SET (password, reset_password_code, expiry_code) = ($1, $2, $3) WHERE reset_password_code = $4;';
    var values = [hashedPassword, null, null, reset_password_code];

    query(client, queryText, values, (error) => {
        /* istanbul ignore if */
        if (error) {
            return callback(error);
        }
        console.log('you have updated user password');
        return callback(null, true);
    });
}

module.exports = updatePassword;
