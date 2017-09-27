var query = require('./query');

/**
 * Represents a function that updates is_last_quiz to false for all quizzes except the current quiz that is being saved/updated
 * @param {object} client - postgres database client
 * @param {string} module_id - module_id for the given Quiz
 * @param {number} quiz_id - quiz_id for the given Quiz
 * @param {function} callback - a callback function
 */

function updateIsLastQuiz (client, module_id, quiz_id, callback) {

    var queryText = 'UPDATE quizzes SET is_last_quiz = false WHERE module_id = $1 AND quiz_id != $2;';
    var values = [module_id, quiz_id];

    query(client, queryText, values, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            return callback(error);
        }
        return callback(null, response);
    });
}

module.exports = updateIsLastQuiz;
