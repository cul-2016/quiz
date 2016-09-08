var query = require('./query');
var queries = require('./queries.json');

/**
 * Returns the mean score for each quiz in a module
 * @param {object} client - database client
 * @param {string} module_id - unique module id
 * @param {function} callback - callback function
 */


function getMeanQuizScores (client, module_id, callback) {

    query(client, queries.getMeanQuizScores, [module_id], (error, data) => {

        if (error) {
            return callback(error);
        }
        callback(null, data.rows);
    });
}

module.exports = getMeanQuizScores;
