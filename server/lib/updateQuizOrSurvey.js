const query = require('./query');

/**
* Represents a function that updates the quiz details
* @param {object} client - postgres database client
* @param {string} module_id - module_id for the given Quiz
* @param {number} quiz_id - quiz_id for the given Quiz
* @param {number} survey_id - survey_id for the given Quiz
* @param {string} name - nae for the given Quiz or Survey
* @param {function} callback - a callback function
*/

function updateQuizOrSurvey (client, module_id, quiz_id, survey_id, name, is_last_quiz, callback) {
    let queryText, value;

    if (quiz_id) {
        queryText = 'UPDATE quizzes SET name = $3, is_last_quiz = $4 WHERE quiz_id = $2 AND module_id = $1;';
        value = [module_id, quiz_id, name, is_last_quiz];
    } else {
        queryText = 'UPDATE surveys SET name = $3 WHERE survey_id = $2 AND module_id = $1;';
        value = [module_id, survey_id, name];
    }

    query(client, queryText, value, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            return callback(error);
        }
        return callback(null, response);
    });
}

module.exports = updateQuizOrSurvey;
