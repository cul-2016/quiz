var query = require('./query');

/**
 * Represents a function that saves the module in the members_module table
 * @param {object} client - postgres database client
 * @param {string} module_id - module_id the user would like to join
 * @params {integer} user_id - user_id for the given user
 * @param {function} callback - a callback function
 */

function saveQuiz (client, module_id, user_id, callback) {

    var queryText = 'INSERT INTO module_members (module_id, user_id) VALUES ($1, $2);';
    var value = [module_id, user_id];

    query(client, queryText, value, (error, response) => {

        if (error) {
            return callback(error);
        }
        return callback(null, response);
    });
}

module.exports = saveQuiz;
