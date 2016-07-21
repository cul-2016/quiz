var query = require('./query');

/**
 * Represents a function that fetches a list of modules belonging to the user
 * For a lecturer, this will return modules they have created.
 * For a student, this will return modules they have joined.
 * @param {object} client - postgres database client
 * @param {string} user_id - user id
 * @param {function} callback - a callback function
 */

function getModuleList (client, user_id, callback) {

    var moduleQuery = 'SELECT module_id, name FROM modules WHERE user_id = $1;';
    var moduleValue = [user_id];

    query(client, moduleQuery, moduleValue, (error, response) => {
    
        if (error) {
            console.error(error);
            callback(error);
        }
        callback(null, response.rows);
    });
}

module.exports = getModuleList;
