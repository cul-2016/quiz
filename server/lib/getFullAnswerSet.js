var query = require('./query');

/**
 * Returns a datadump of full set of answer set.
 * Returns an object of arrays. Keys: 'name', 'questions'.
 * @param {object} client - database client
 * @param {function} callback - callback function
 */

function getFullAnswerSet (client, callback) {

    var getFullAnswerSetQuery = "SELECT U.email as lecturer_email, quizzes.module_id as module_id, users.username as nickname, users.email as student_email, COALESCE(surveys.survey_id::text, ' - ') as survey_id, COALESCE(quizzes.quiz_id::text, ' - ') as quiz_id, responses.question_id as question_id, responses.response as response, COALESCE(questions.correct_answer, ' - ') as correct_answer FROM responses INNER JOIN questions on responses.question_id = questions.question_id INNER JOIN users ON users.user_id = responses.user_id LEFT JOIN surveys ON responses.survey_id = surveys.survey_id LEFT JOIN quizzes ON responses.quiz_id = quizzes.quiz_id INNER JOIN modules ON modules.module_id = quizzes.module_id OR modules.module_id = surveys.module_id INNER JOIN users as U ON modules.user_id = U.user_id;";
    query(client, getFullAnswerSetQuery, [], (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, response.rows);
    });
}

module.exports = getFullAnswerSet;
