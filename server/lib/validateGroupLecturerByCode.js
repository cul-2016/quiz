var query = require('./query');

/**
 * Represents a function that validates the code and also returns the total number of users already using that code,
 * alongside the limit for this code.
 * @param {object} client - postgres database client
* @param {string} group_code - code which associates a lecturer to a particular group (e.g. a university department)
 * @param {function} callback - a callback function
 */

function validateGroupLecturerByCode (client, group_code, callback) {


    const queryString1 = `select count(*)::int from users where users.group_code = $1 AND users.is_user_active = true;`;

    const queryString2 = `SELECT user_limit, group_code, paid, email FROM account_management WHERE account_management.group_code = $1;`;
    const queryArray = [group_code];

    query(client, queryString1, queryArray, (error, actualUserCountWithCode) => {
        /* istanbul ignore if */
        if (error) {
            console.log(error);
            return callback(error);
        } else {


            query(client, queryString2, queryArray, (error, response) => {
                /* istanbul ignore if */
                if (error) {
                    console.log(error);
                    return callback(error);
                }
                callback(null, { accountDetails: response.rows, actualUserCountWithCode: actualUserCountWithCode.rows[0] });
            });
        }


    });
}

module.exports = validateGroupLecturerByCode;
