var query = require('./query');
var queries = require('./queries.json');
/**
 * A function that returns the students participation rate for a module
 * Participation rate is represented as a percentage
 * Forms part of the data for the `/get-feedback` endpoint
 * @param {number} user_id - user id
 * @param {string} module_id - module id
 * @param {function} callback - a callback function
 */


function getParticipationRate (client, user_id, module_id, callback) {

    var values = [user_id, module_id];
    query(client, queries.getParticipationRate, values, (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, response.rows[0].average);
    });

}


module.exports = getParticipationRate;
