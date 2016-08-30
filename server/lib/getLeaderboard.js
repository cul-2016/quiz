var query = require('./query');
var queries = require('./queries.json');

/**
 * Represents a function that fetches a the leaderboard
 * @param {object} client - postgres database client
 * @param {string} module_id - module id
 * @param {function} callback - a callback function
 */

function getLeaderboard (client, module_id, callback) {

    var moduleValue = [module_id];

    query(client, queries.getLeaderboard, moduleValue, (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = getLeaderboard;
