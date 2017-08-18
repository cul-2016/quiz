var query = require('./query');
var queries = require('./queries.json');

/**
 * Represents a function that returns every score for all the quizzes for every student in a module
 * @param {object} client - postgres database client
 * @param {string} module_id - module id
 * @param {function} callback - a callback function
 */

function getScoresForLeaderboard (client, module_id, callback) {

    var moduleValue = [module_id];

    query(client, queries.getScoresForLeaderboard, moduleValue, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = getScoresForLeaderboard;
