var query = require('./query');

/**
 * Represents a function that fetches a list of modules belonging to the user
 * For a lecturer, this will return modules they have created.
 * For a student, this will return modules they have joined.
 * @param {object} client - postgres database client
 * @param {string} user_id - user id
 * @param {boolean} is_lecturer - boolean value to show if user is student or lecturer
 * @param {function} callback - a callback function
 */

function getModuleList (client, user_id, is_lecturer, callback) {
    var moduleQuery, moduleValue;
    if (is_lecturer) {

        moduleQuery = 'SELECT module_id, name FROM modules WHERE user_id = $1;';
        moduleValue = [user_id];
    } else {

        moduleQuery = 'SELECT module_members.module_id, modules.name FROM module_members INNER JOIN modules ON module_members.module_id = modules.module_id WHERE module_members.user_id = $1;';
        moduleValue = [user_id];
    }
    query(client, moduleQuery, moduleValue, (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, response.rows);
    });
}

module.exports = getModuleList;
