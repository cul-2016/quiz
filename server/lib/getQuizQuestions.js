var query = require('./query');
var removeNullAnswers = require('./removeNullAnswers');

/**
 * Represents a function that returns a list of questions that belong to a quiz
 * @param {object} client - postgres database client
 * @param {integer} quiz_id - quiz id
 * @param {function} callback - a callback function
 */

function getQuizQuestions (client, quiz_id, callback) {

    var moduleQuery = 'SELECT question_id, order_id, question, a, b, c, d FROM questions WHERE quiz_id=$1 ORDER BY order_id, question_id;';
    var moduleValue = [quiz_id];

    query(client, moduleQuery, moduleValue, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, removeNullAnswers(response.rows));
    });
}

module.exports = getQuizQuestions;
