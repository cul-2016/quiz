var query = require('./query');

/**
 * Represents a function that saves the students response into response table
 * @param {object} client - postgres database client
 * @param {integer} user_id - user_id of the students
 * @param {integer} quiz_id - quiz_id for the given Quiz
 * @param {integer} question_id - question_id for the given Question
 * @params {string} response - response for the given student
 * @param {function} callback - a callback function
 */

function saveStudentResponse (client, user_id, quiz_id, question_id, response, callback) {

    var queryText = 'INSERT INTO responses (user_id, quiz_id, question_id, response) VALUES ($1, $2, $3, $4);';
    var value = [user_id, quiz_id, question_id, response];

    query(client, queryText, value, (error, response) => {

        if (error) {
            return callback(error);
        }
        return callback(null, response);
    });
}

module.exports = saveStudentResponse;
