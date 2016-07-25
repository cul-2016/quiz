var bcrypt = require('bcrypt');

/**
* Represents a function that encrypts the password
* @param {string} password - password that the user has entered
* @param {Function} callback - callback function.
*/
function hashPassword (password, callback) {

    var saltRounds = 10;
    bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
        if (error) {
            callback(error);
        }
        callback(null, hashedPassword);
    });
}

module.exports = hashPassword;
