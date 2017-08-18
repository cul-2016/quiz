var query = require('./query');
var queries = require('./queries.json');
/**
 * Returns the scores for any quizzes a student has participated in
 * @param {object} client - database client
 * @param {number} user_id - user id
 * @param {string} module_id - unique module id
 * @param {function} callback - callback function
 */

function getQuizScores (client, user_id, module_id, callback) {

    query(client, queries.getQuizScores, [user_id, module_id], (error, data) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, data.rows);
    });
}

module.exports = getQuizScores;
