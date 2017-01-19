var query = require('./query');
var queries = require('./queries.json');

/**
 * Represents a function that saves a student's response into response table
 * @param {object} client - postgres database client
 * @param {integer} user_id - user_id of the students
 * @param {integer} id - quiz_id or survey_id for the given live quiz
 * @param {boolean} isSurvey - Boolean value to determine if the quiz is a survey
 * @param {integer} question_id - question_id for the given Question
 * @param {string} response - response for the given student
 * @param {function} callback - a callback function
 */

function saveStudentResponse (client, user_id, id, isSurvey, question_id, response, callback) {

    let saveStudentResponseQuery;
    var value = [user_id, id, question_id, response];
    if (!isSurvey) {
        saveStudentResponseQuery = queries.saveStudentResponseQuiz;
    } else {
        saveStudentResponseQuery = queries.saveStudentResponseSurvey;
    }

    query(client, saveStudentResponseQuery, value, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        return callback(null, response);
    });
}

module.exports = saveStudentResponse;
