var query = require('./query');

/**
 * Represents a function that updates an existing score for a user
 * @param {object} client - postgres database client
 * @param {number} quiz_id - quiz id to which the student will belong to
 * @param {number} user_id - user id for a student
 * @param {number} score - score which needs to be updated in the database
 * @param {function} callback - a callback function
 */

function editScore (client, quiz_id, user_id, score, callback) {

    var moduleQuery = 'UPDATE scores SET score = $1 WHERE quiz_id = $2 AND user_id = $3;';
    var moduleValue = [score, quiz_id, user_id];



    query(client, moduleQuery, moduleValue, (error, response) => {

        if (error) {
            console.error(error);
            callback(error);
        }
        callback(null, response);
    });
}

module.exports = editScore;
