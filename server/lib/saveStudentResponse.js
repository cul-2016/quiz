var query = require('./query');
var queries = require('./queries.json');

/**
 * Represents a function that saves a student's response into response table
 * @param {object} client - postgres database client
 * @param {integer} user_id - user_id of the students
 * @param {integer} quiz_id - quiz_id for the given Quiz
 * @param {integer} question_id - question_id for the given Question
 * @param {string} response - response for the given student
 * @param {function} callback - a callback function
 */

function saveStudentResponse (client, user_id, quiz_id, question_id, response, callback) {

    var value = [user_id, quiz_id, question_id, response];

    query(client, queries.saveStudentResponse, value, (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        return callback(null, response);
    });
}

module.exports = saveStudentResponse;
