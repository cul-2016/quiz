var query = require('../query');

/**
 * Represents a function that saves a new client to the account_management table
 * @param {object} client - postgres database client
 * @param {object} payload - object that contains all client information (name, email, institution, accountType, department, paid, code)
 * @param {function} callback - a callback function
 */

function saveClient (client, payload, callback) {

    var queryText = 'INSERT INTO account_management (name, email, institution, department, account_type, paid, code) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, institution = EXCLUDED.institution, department = EXCLUDED.department, account_type = EXCLUDED.account_type, paid = EXCLUDED.paid, code = EXCLUDED.code;';

    var value = [payload.name, payload.email, payload.institution, payload.department, payload.accountType, payload.paid, payload.code];

    query(client, queryText, value, (error) => {
        /* istanbul ignore if */
        if (error) {
            return callback(error);
        }
        return callback(null);
    });
}

module.exports = saveClient;