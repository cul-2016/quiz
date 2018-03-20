var query = require('./query');

/**
 * Represents a function that validates the code and also returns the total number of users already using that code,
 * alongside the limit for this code.
 * @param {object} client - postgres database client
* @param {string} group_code - code which associates a lecturer to a particular group (e.g. a university department)
 * @param {function} callback - a callback function
 */

function validateGroupLecturerByCode (client, group_code, callback) {

    const queryArray = [group_code];
    const queryString = `SELECT new_table.users_with_code, new_table.user_limit, new_table.group_code, new_table.admin_email
FROM(
    SELECT count(users.group_code)::int AS users_with_code, account_management.user_limit AS user_limit, account_management.group_code AS group_code, account_management.email AS admin_email
    FROM users RIGHT JOIN account_management ON users.group_code = account_management.group_code WHERE account_management.group_code = $1
	GROUP BY account_management.user_limit, users.group_code, account_management.group_code, account_management.email
) AS new_table;`;


    query(client, queryString, queryArray, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.log(error);
            return callback(error);
        }
        callback(null, response.rows);
    });
}

module.exports = validateGroupLecturerByCode;
