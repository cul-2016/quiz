var query = require('./query');

/**
 * Returns survey information from the database.
 * Returns an object of arrays. Keys: 'name', 'questions'.
 * @param {object} client - database client
 * @param {string} survey_id - unique survey id
 * @param {function} callback - callback function
 */

function getQuizDetails (client, survey_id, callback) {

    var questionsQuery = 'SELECT question_id, order_id, question, a, b, c, d, correct_answer FROM questions WHERE survey_id = $1 ORDER BY order_id, question_id;';
    query(client, questionsQuery, [survey_id], (error, questions) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        var nameQuery = 'SELECT name FROM surveys WHERE survey_id = $1;';
        query(client, nameQuery, [survey_id], (error, name) => {
            /* istanbul ignore if */
            if (error) {
                console.error(error);
                return callback(error);
            }

            const allData = {
                name: name.rows[0].name,
                questions: questions.rows,
            };
            callback(null, allData);
        });
    });
}

module.exports = getQuizDetails;
