var query = require('./query');

/**
 * Represents a function that updates is_last_quiz to false for all quizzes except the lastest one
 * @param {object} client - postgres database client
 * @param {string} module_id - module_id for the given Quiz
 * @param {number} quiz_id - quiz_id for the given Quiz
 * @param {function} callback - a callback function
 */

function updateIsLastQuiz (client, quiz_id, module_id, callback) {

    var queryText = 'UPDATE quizzes SET is_last_quiz = false WHERE quiz_id != $1 AND module_id = $2;';
    var value = [quiz_id, module_id];

    query(client, queryText, value, (error, response) => {

        if (error) {
            return callback(error);
        }
        return callback(null, response);
    });
}

module.exports = updateIsLastQuiz;
