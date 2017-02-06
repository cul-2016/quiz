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
        'SELECT',
        'q.question, q.a, q.b, q.c, q.d, q.correct_answer, r.response, r.user_id',
        'FROM',
        'questions as q',
        'LEFT OUTER JOIN',
        'responses as r',
        'on q.question_id = r.question_id',
        'WHERE q.quiz_id = $1',
        'ORDER BY q.question_id'
    ].join(' ');

    query(client, questionsQuery, [quiz_id], (error, questions) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }

        callback(
            null,
            questions.rows.filter(
                (row) => !row.user_id || row.user_id === user_id
            )
        );
    });
}

module.exports = getQuizDetailsStudent;
