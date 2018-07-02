var query = require('./query');
var queries = require('./queries.json');
const lti = require('ims-lti');

/**
 * Represents a function that updates an existing score for a student
 * @param {object} client - postgres database client
 */

function updateMoodleGrade (client, user_id, module_id, lti_payload, callback) {

    var queryText = "SELECT (SUM(score))::numeric / (SELECT COUNT(question_id) FROM questions JOIN quizzes ON questions.quiz_id = quizzes.quiz_id WHERE module_id = $1) AS module_percentage FROM scores JOIN quizzes ON scores.quiz_id = quizzes.quiz_id WHERE module_id = $1 AND user_id = $2;";
    var values = [module_id, user_id];

    query(client, queryText, values, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }

        var provider = new lti.Provider(lti_payload.oauth_consumer_key, process.env.LTI_SECRET);

        var req = {
          method: 'POST',
          body: {
            ext_outcome_data_values_accepted: 'text,url',
            lis_outcome_service_url: lti_payload.lis_outcome_service_url,
            lis_result_sourcedid: lti_payload.lis_result_sourcedid,
            lti_message_type: "basic-lti-launch-request",
            lti_version: "LTI-1p0"
          }
        };

        provider.valid_request(req, function (err, is_valid) {
          if (!is_valid || !provider.outcome_service) return false;
        });

        return provider.outcome_service.send_replace_result(parseFloat(response.rows[0].module_percentage), (err, result) => {
          if (err) console.log(err);
          return callback(null, response);
        })
    });
}

module.exports = updateMoodleGrade;
