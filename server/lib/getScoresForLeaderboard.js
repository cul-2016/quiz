var query = require('./query');
var queries = require('./queries.json');

/**
 * Represents a function that fetches every score for all the quizzes a student has participated in
 * @param {object} client - postgres database client
 * @param {string} module_id - module id
 * @param {function} callback - a callback function
 */

function getScoresForLeaderboard (client, module_id, callback) {

    var moduleValue = [module_id];

    query(client, queries.getScoresForLeaderboard, moduleValue, (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = getScoresForLeaderboard;
