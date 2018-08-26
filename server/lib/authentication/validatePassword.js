var bcrypt = require('bcrypt');

/**
* Represents a function that validates whether the users password is correct
* @param {string} password - password that the user has entered
* @param {string} hashedPassword - hashedPassword for the given user from the database
* @param {Function} callback - callback function.
*/
function validatePassword (password, hashedPassword, callback) {
    bcrypt.compare(password, hashedPassword, (error, response) => {
        /* istanbul ignore if */
        if (error) {
          console.log(error);
          return callback(error);
        }
        return callback(null, response);
    });
}

module.exports = validatePassword;
