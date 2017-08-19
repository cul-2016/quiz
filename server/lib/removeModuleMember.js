var query = require('./query');

/**
 * Represents a function that removes the user from a module
 * @param {object} client - postgres database client
 * @param {string} module_id - module_id
 * @param {number} user_id - user_id
 * @param {function} callback - a callback function
 */

function removeModuleMember (client, module_id, quiz_id, callback) {

    var moduleQuery = 'DELETE FROM module_members WHERE module_id = $1 AND user_id = $2;';
    var moduleValue = [module_id, quiz_id];

    query(client, moduleQuery, moduleValue, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, response);
    });
}

module.exports = removeModuleMember;
