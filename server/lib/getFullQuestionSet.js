var query = require('./query');

/**
 * Returns a datadump of full set of question set.
 * Returns an object of arrays. Keys: 'name', 'questions'.
 * @param {object} client - database client
 * @param {function} callback - callback function
 */

function getFullQuestionSet (client, callback) {
    var fullQuestionSetQuery = "SELECT users.email as lecturer_email, modules.module_id, COALESCE(questions.quiz_id::text, ' - ') as quiz_id, COALESCE(quizzes.is_presented::text, ' - ') as quiz_is_run, COALESCE(questions.survey_id::text, ' - ') as survey_id, COALESCE(surveys.is_presented::text, ' - ') as survey_is_run, questions.question_id, questions.question, questions.a, questions.b, COALESCE(questions.c, ' - ') as c, COALESCE(questions.d, ' - ') as d, COALESCE(questions.correct_answer, ' - ') as correct_answer FROM questions LEFT JOIN quizzes ON questions.quiz_id = quizzes.quiz_id LEFT JOIN surveys ON questions.survey_id = surveys.survey_id INNER JOIN modules ON modules.module_id = quizzes.module_id OR modules.module_id = surveys.module_id INNER JOIN users ON users.user_id = modules.user_id where users.is_lecturer = true;";
    query(client, fullQuestionSetQuery, [], (error, response) => {
        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, response.rows);
    });
}

module.exports = getFullQuestionSet;
