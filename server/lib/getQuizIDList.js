var query = require('./query');
var queries = require('./queries.json');

/**
 * Represents a function that returns a list of quiz ids in a module
 * @param {object} client - postgres database client
 * @param {string} module_id - module id
 * @param {function} callback - a callback function
 */

function getQuizIDList (client, module_id, callback) {

    var moduleValue = [module_id];

    query(client, queries.getQuizIDList, moduleValue, (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = getQuizIDList;
