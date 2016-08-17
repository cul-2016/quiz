var query = require('./query');

/**
 * Represents a function that validates the module_id.
 * Returns true if the module_id exists and false if not.
 * @param {object} client - postgres database client
 * @param {string} module_id - module_id
 * @param {function} callback - a callback function
 */
function validateModuleID (client, module_id, callback) {

    var moduleQuery = 'SELECT EXISTS(SELECT 1 FROM modules WHERE module_id = $1);';
    var moduleValue = [module_id];

    query(client, moduleQuery, moduleValue, (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, response.rows[0].exists);
    });
}

module.exports = validateModuleID;
