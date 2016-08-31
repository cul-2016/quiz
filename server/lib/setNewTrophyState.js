var query = require('./query');
var queries = require('./queries.json');

/**
 * Saves a student's new trophy state
 * @param {object} client - postgres database client
 * @param {number} user_id - user id
 * @param {string} module_id - module id
 * @param {array} newTrophyState - the new, recently calculated trophy state
 * @param {function} callback - a callback function
 */

function setNewTrophyState (client, user_id, module_id, newTrophyState, callback) {

    var queryValues = [user_id, module_id].concat(newTrophyState);

    if (queryValues.length !== 6) {
        return callback(new Error("Too few arguments"));
    }
    query(client, queries.setNewTrophyState, queryValues, (error) => {

        if (error) {
            return callback(error);
        }
        callback();
    });
}

module.exports = setNewTrophyState;
