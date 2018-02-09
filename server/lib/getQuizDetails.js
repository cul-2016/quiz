var query = require('./query');

/**
 * Returns quiz information from the database.
 * Returns an object of arrays. Keys: 'name', 'questions'.
 * @param {object} client - database client
 * @param {string} quiz_id - unique quiz id
 * @param {function} callback - callback function
 */

function getQuizDetails (client, quiz_id, callback) {

    var questionsQuery = 'SELECT question_id, order_id, question, a, b, c, d, correct_answer, more_information FROM questions WHERE quiz_id = $1 ORDER BY order_id, question_id;';
    query(client, questionsQuery, [quiz_id], (error, questions) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        var nameQuery = 'SELECT name, is_last_quiz FROM quizzes WHERE quiz_id = $1;';
        query(client, nameQuery, [quiz_id], (error, name) => {
            /* istanbul ignore if */
            if (error) {
                console.error(error);
                return callback(error);
            }

            const allData = {
                name: name.rows[0].name,
                questions: questions.rows,
                is_last_quiz: name.rows[0].is_last_quiz
            };
            callback(null, allData);
        });
    });
}

module.exports = getQuizDetails;
