var query = require('./query');

/**
 * Represents a function that saves new quiz and returns quiz_id for the saved quiz
 * @param {object} client - postgres database client
 * @param {string} module_id - module_id for the given Quiz
 * @params {string} quizName - quizName for the given Quiz
 * @param {function} callback - a callback function
 */

function saveQuiz (client, module_id, quizName, callback) {

    var query = 'INSERT INTO quizzes (module_id, name) VALUES ($1, $2) RETURNING quiz_id;';
    var value = [module_id, quizName];

    query(client, query, value, (error, response) => {

        if (error) {
            return callback(error);
        }
        console.log(response);
        return callback(null, response.rows);
    });
}

module.exports = saveQuiz;
