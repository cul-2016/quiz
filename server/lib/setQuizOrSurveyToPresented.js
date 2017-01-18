const query = require('./query');

/**
 *  Changes the `is_presented` column value for a quiz to true
 * @param {object} client - postgres client
 * @param {number} id - quiz or survey id
 * @param {boolean} isSurvey - isSurvey Boolean
 * @param {function} callback - callback function
 */

function setQuizOrSurveyToPresented (client, id, isSurvey, callback) {
    let queryText, queryValues;

    if (!isSurvey) {
        queryText = "UPDATE quizzes SET is_presented = $1 WHERE quiz_id = $2";
        queryValues = [true, id];
    } else {
        queryText = "UPDATE surveys SET is_presented = $1 WHERE survey_id = $2";
        queryValues = [true, id];
    }

    query(client, queryText, queryValues, (error, response) => { //eslint-disable-line no-unused-vars

        if (error) {
            return callback(error);
        }
        return callback(null, true);
    });
}

module.exports = setQuizOrSurveyToPresented;
