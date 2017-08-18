var query = require('./query');
var queries = require('./queries.json');

/**
 * Represents a function that saves a student as a member of a module
 * @param {object} client - postgres database client
 * @param {string} module_id - module_id
 * @param {number} user_id - user_id
 * @param {function} callback - a callback function
 */

function joinModule (client, module_id, user_id, callback) {

    var values = [module_id, user_id];

    query(client, queries.joinModule, values, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        return callback(null, response);
    });
}

module.exports = joinModule;
