var query = require('./query');

/**
 * Returns from the database quiz info
 * (questions, options, correct answer and provided answer).
 *
 * Returns an array of questions
 * @param {object} client - database client
 * @param {string} quiz_id - unique quiz id
 * @param {string} user_id - unique user id
 * @param {function} callback - callback function
 */

function getQuizDetailsStudent (client, quiz_id, user_id, callback) {

    const questionsQuery = [
        'SELECT questions.question,',
        'questions.a, questions.b, questions.c, questions.d,',
        'questions.correct_answer, responses.response',
        'FROM questions JOIN responses ON',
        'questions.quiz_id = $1 AND',
        'responses.user_id = $2 AND',
        'questions.quiz_id = responses.quiz_id AND',
        'questions.question_id = responses.question_id',
        'ORDER BY questions.question_id;'
    ].join(' ');

    query(client, questionsQuery, [quiz_id, user_id], (error, questions) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, questions.rows);
    });
}

module.exports = getQuizDetailsStudent;
