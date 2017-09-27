var query = require('./query');

/**
 * Returns a boolean value for whether the quiz is the last quiz for a given module.
 * Returns an object of arrays. Keys: 'name', 'questions'.
 * @param {object} client - database client
 * @param {string} quiz_id - unique quiz id
 * @param {function} callback - callback function
 */

function getIsLastQuiz (client, quiz_id, callback) {

    var quizquery = 'SELECT is_last_quiz FROM quizzes WHERE quiz_id = $1;';
    query(client, quizquery, [quiz_id], (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, response.rows[0].is_last_quiz);
    });
}

module.exports = getIsLastQuiz;
