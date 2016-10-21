var query = require('./query');
var queries = require('./queries.json');

/**
 * Represents a function that returns the total scores and trophies for a leaderboard.
 * @param {object} client - postgres database client
 * @param {string} module_id - module id
 * @param {function} callback - a callback function
 */

function getTotalScoresAndTrophies (client, module_id, callback) {

    var moduleValue = [module_id];

    query(client, queries.getTotalScoresAndTrophies, moduleValue, (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = getTotalScoresAndTrophies;
