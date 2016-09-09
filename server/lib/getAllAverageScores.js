var query = require('./query');
var queries = require('./queries.json');

/**
 * Returns all students' percentage scores for a module
 * @param {object} client - postgres database client
 * @param {string} module_id - module id
 * @param {function} callback - a callback function
 */


function getAllAverageScores (client, module_id, callback) {

    query(client, queries.getAllAverageScores, [module_id], (error, result) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, result.rows);
    });
}

module.exports = getAllAverageScores;
