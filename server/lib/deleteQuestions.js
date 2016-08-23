var preparedQuery = require('./preparedQuery');
var composeDeleteQuestionStatement = require('./composeDeleteQuestionStatement');

/**
 * Represents a function that deletes existing questions
 * @param {object} client - postgres database client
 * @params {array} questions - array of question_id for the quetions that will be deleted
 * @param {function} callback - a callback function
 */


function deleteQuestions (client, questions, callback) {

    composeDeleteQuestionStatement(questions, (error, builtStatement) => {

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

module.exports = deleteQuestions;
