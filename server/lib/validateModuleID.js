var query = require('./query');

/**
 * Represents a function that validates the module_id
 * returns true if the module already exists and false if it doesnt.
 * @param {object} client - postgres database client
 * @param {string} module_id - module_id
 * @param {function} callback - a callback function
 */
function validateModuleID (client, module_id, callback) {

    var moduleQuery = 'select exists(select 1 from modules where module_id=$1);';
    var moduleValue = [module_id];

    query(client, moduleQuery, moduleValue, (error, response) => {

        if (error) {
            console.error(error);
            callback(error);
        }
        callback(null, response.rows);
    });
}

module.exports = validateModuleID;
