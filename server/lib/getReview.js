var query = require('./query');
var queries = require('./queries.json');
var removeNullAnswers = require('./removeNullAnswers');

/**
 * Represents a function that returns a list of questions that belong to a quiz, along with all the responses for each questions
 * @param {object} client - postgres database client
 * @param {number} id - quiz or survey id
 * @param {boolean} isSurvey - isSurvey Boolean value
 * @param {function} callback - a callback function
 */

function getReview (client, id, isSurvey, callback) {
    const idArray = [id];
    let getQuizReviewQuery;
    if (!isSurvey) {
        getQuizReviewQuery = queries.getQuizReview;
    } else {
        getQuizReviewQuery = queries.getSurveyReview;
    }

    query(client, getQuizReviewQuery, idArray, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        callback(null, removeNullAnswers(response.rows));
    });
}

module.exports = getReview;
