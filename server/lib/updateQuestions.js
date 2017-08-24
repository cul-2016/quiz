var preparedQuery = require('./preparedQuery');
var composeUpdateQuestionStatement = require('./composeUpdateQuestionStatement');

/**
 * Represents a function that updates existing questions
 * @param {object} client - postgres database client
 * @params {array} questions - array of questions
 * @param {function} callback - a callback function
 */


function updateQuestions (client, questions, callback) {

    if (questions.length === 0) {
        return callback(null);
    } else {
        composeUpdateQuestionStatement(questions, (error, builtStatement) => {
            /* istanbul ignore if */
            if (error) {
                return callback(error);
            }

            preparedQuery(client, builtStatement, (error, response) => {
                /* istanbul ignore if */
                if (error) {
                    return callback(error);
                }
                return callback(null, response);
            });
        });
    }

}

module.exports = updateQuestions;
