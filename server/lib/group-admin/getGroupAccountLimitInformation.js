var query = require('../query');

/**
 * Represents a function that retricves the count of users using the code and the user limit for this institution
 * @param {object} client - postgres database client
 * @param {string} group_code - code which associates a lecturer to a particular group (e.g. a university department)
 * @param {function} callback - a callback function
 */

function getGroupAccountLimitInformation (client, group_code, callback) {
    var queryText = 'SELECT count(*)::int, account_management.user_limit FROM users INNER JOIN account_management ON users.group_code = account_management.group_code WHERE users.group_code = $1 AND users.is_user_active GROUP BY account_management.user_limit;';
    var queryArray = [group_code];

    query(client, queryText, queryArray, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error("`getGroupAccountLimitInformation`", error);
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = getGroupAccountLimitInformation;
