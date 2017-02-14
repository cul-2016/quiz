var preparedQuery = require('./preparedQuery');
var composeQuestionStatement = require('./composeQuestionStatement');

/**
 * Represents a function that saves new questions to a quiz
 * @param {object} client - postgres database client
 * @params {array} questions - array of questions
 * @param {function} callback - a callback function
 */

function saveQuestions (client, id, questions, { isSurvey }, callback) {

    composeQuestionStatement(id, questions, { isSurvey }, (error, builtStatement) => {
        /* istanbul ignore if */
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
