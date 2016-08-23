var preparedQuery = require('./preparedQuery');
var composeUpdateQuestionStatement = require('./composeUpdateQuestionStatement');

/**
 * Represents a function that updates existing questions
 * @param {object} client - postgres database client
 * @params {array} questions - array of questions
 * @param {function} callback - a callback function
 */


function saveQuestions (client, questions, callback) {

    composeUpdateQuestionStatement(questions, (error, builtStatement) => {

        if (error) {
            return callback(error);
        }

        preparedQuery(client, builtStatement, (error, response) => {

            if (error) {
                return callback(error);
            }
            return callback(null, response);
        });
    });
}

module.exports = saveQuestions;
