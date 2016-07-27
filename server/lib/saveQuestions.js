var preparedQuery = require('./preparedQuery');
var composeQuestionStatement = require('./composeQuestionStatement');

/**
 * Represents a function that saves new queestions
 * @param {object} client - postgres database client
 * @params {array} questions - array of questions
 * @param {function} callback - a callback function
 */


function saveQuestions (client, questions, callback) {

    composeQuestionStatement(questions, (error, builtStatement) => {

        if (error) {
            return callback(error);
        }
        console.log(error, builtStatement, 'from composeQuestionStatement');
        preparedQuery(client, builtStatement, (error, response) => {
            console.log(error, response, 'preparedQuery');
            if (error) {
                return callback(error);
            }
            return callback(null, response);
        });
    });
}

module.exports = saveQuestions;
