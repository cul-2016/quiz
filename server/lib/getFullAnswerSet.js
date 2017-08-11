var query = require('./query');

/**
 * Returns a datadump of full set of answer set.
 * Returns an object of arrays. Keys: 'name', 'questions'.
 * @param {object} client - database client
 * @param {function} callback - callback function
 */

function getFullAnswerSet (client, callback) {

    var getFullAnswerSetQuery = 'SELECT U.email as lecturer_email, quizzes.module_id as module_id, users.username as nickname, users.email as student_email, quizzes.quiz_id as quiz_id,  responses.question_id as question_id, responses.response as response, questions.correct_answer as correct_answer FROM responses JOIN questions on responses.question_id = questions.question_id INNER JOIN users ON users.user_id = responses.user_id INNER JOIN quizzes ON responses.quiz_id = quizzes.quiz_id INNER JOIN modules ON modules.module_id = quizzes.module_id INNER JOIN users as U ON modules.user_id = U.user_id WHERE responses.quiz_id IS NOT NULL;';
    query(client, getFullAnswerSetQuery, [], (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, response.rows);
    });
}

module.exports = getFullAnswerSet;
