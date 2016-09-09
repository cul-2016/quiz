var query = require('./query');
var queries = require('./queries.json');
/**
 * A function that returns the students participation rate for a given module
 * @param {string} module_id - module id
 * @param {number} user_id - user id
 * @param {function} callback - a callback function
 */


function getparticipationrate (client, module_id, user_id, callback) {

    var value = [module_id, user_id];
    query(client, queries.getparticipationrate, value, (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, response.rows[0]);
    });

}


module.exports = getparticipationrate;
