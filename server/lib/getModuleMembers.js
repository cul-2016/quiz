var query = require('./query');

/**
 * Represents a function that returns a list of students belonging to a module
 * @param {object} client - postgres database client
 * @param {string} module_id - module id to which all students will belong to
 * @param {function} callback - a callback function
 */

function getModuleMembers (client, module_id, callback) {

    var moduleQuery = 'SELECT module_members.user_id, users.username, users.email FROM module_members INNER JOIN users ON module_members.user_id = users.user_id WHERE module_id = $1;';
    var moduleValue = [module_id];



    query(client, moduleQuery, moduleValue, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, response.rows);
    });
}

module.exports = getModuleMembers;
