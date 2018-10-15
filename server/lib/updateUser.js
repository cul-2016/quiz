var query = require('./query');

/**
 * Represents a function that updates the password for a given user and deletes the expiry_code and reset_password_code
 * @param {object} client - postgres database client
 * @param {function} callback - a callback function
 */

function updateUser (client, userId, details, callback) {
    var fields = Object.keys(details);
    var fieldString = fields.join(", ");

    var queryText = 'UPDATE users SET (' + fieldString + ') = (' + fields.map((e,i) => '$' + (i + 1)) + ') WHERE user_id = $' + (fields.length + 1) + ';';
    var values = fields.map(el => details[el]).concat(userId);

    query(client, queryText, values, (error, res) => {
        /* istanbul ignore if */
        if (error) {
            return callback(error);
        }
        return callback(null, res);
    });
}

module.exports = updateUser;
