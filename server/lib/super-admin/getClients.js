var query = require('../query');

/**
 * Represents a function that retrieves all rows from the account_management table
 * @param {object} client - postgres database client
 * @param {function} callback - a callback function
 */

function getClients (client, callback) {
    var queryText = 'SELECT * FROM account_management';

    query(client, queryText, [], (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error("`getClients`", error);
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = getClients;
