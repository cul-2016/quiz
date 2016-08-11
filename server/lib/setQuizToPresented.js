var query = require('./query');

/**
 *  Changes the `is_presented` column value for a quiz to true
 * @param {object} client - postgres client
 * @param {number} quiz_id - quiz id
 * @param {function} callback - callback function
 */

function setQuizToPresented (client, quiz_id, callback) {

    var queryText = "UPDATE quizzes SET is_presented = $1 WHERE quiz_id = $2";
    var queryValues = [true, quiz_id];

    query(client, queryText, queryValues, (error, response) => { //eslint-disable-line no-unused-vars

        if (error) {
            return callback(error);
        }
        return callback(null, true);
    });
}

module.exports = setQuizToPresented;
