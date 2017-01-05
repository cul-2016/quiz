var query = require('./query');

/**
 * Represents a function that saves new quiz and returns quiz_id for the saved quiz
 * @param {object} client - postgres database client
 * @param {string} module_id - module_id for the given Quiz
 * @param {string} name - name for the given Quiz
 * @param {boolean} is_last_quiz - whether the quiz is the last quiz in the module or not
 * @param {function} callback - a callback function
 */

function saveQuiz (client, module_id, name, is_last_quiz, callback) {

    var queryText = 'INSERT INTO quizzes (module_id, name, is_last_quiz) VALUES ($1, $2, $3) RETURNING quiz_id;';
    var value = [module_id, name, is_last_quiz];

    query(client, queryText, value, (error, response) => {

        if (error) {
            return callback(error);
        }
        return callback(null, response.rows[0].quiz_id);
    });
}

module.exports = saveQuiz;
