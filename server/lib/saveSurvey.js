var query = require('./query');

/**
 * Represents a function that saves new quiz and returns quiz_id for the saved quiz
 * @param {object} client - postgres database client
 * @param {string} module_id - module_id for the given Survey
 * @param {string} name - name for the given Survey
 * @param {boolean} is_last_quiz - whether the quiz is the last quiz in the module or not
 * @param {function} callback - a callback function
 */

function saveSurvey (client, module_id, name, callback) {

    var queryText = 'INSERT INTO surveys (module_id, name) VALUES ($1, $2) RETURNING survey_id;';
    var value = [module_id, name];

    query(client, queryText, value, (error, response) => {

        if (error) {
            return callback(error);
        }
        return callback(null, response.rows[0].survey_id);
    });
}

module.exports = saveSurvey;
