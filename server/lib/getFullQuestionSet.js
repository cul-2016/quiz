var query = require('./query');

/**
 * Returns a datadump of full set of question set.
 * Returns an object of arrays. Keys: 'name', 'questions'.
 * @param {object} client - database client
 * @param {function} callback - callback function
 */

function getFullQuestionSet (client, callback) {
    var fullQuestionSetQuery = 'SELECT users.email, modules.module_id, quizzes.quiz_id, quizzes.name, quizzes.is_presented as is_run, questions.question_id, questions.question, questions.a, questions.b, questions.c, questions.d, questions.correct_answer FROM users INNER JOIN modules ON modules.user_id = users.user_id INNER JOIN quizzes ON quizzes.module_id = modules.module_id INNER JOIN questions ON questions.quiz_id = quizzes.quiz_id WHERE users.is_lecturer = true;';
    query(client, fullQuestionSetQuery, [], (error, response) => {
        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, response.rows);
    });
}

module.exports = getFullQuestionSet;
