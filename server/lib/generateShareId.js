const query = require('./query.js');
var shortid = require('shortid');


function generateShareId (client, quiz_id, survey_id, callback) {
    let generateShareIdQuery, generateShareIdParams;
    let uniqueCode = shortid.generate();
    if (quiz_id) {
        generateShareIdQuery = 'UPDATE quizzes SET share_id = $1 WHERE quiz_id = $2;';
        generateShareIdParams = [uniqueCode, quiz_id];
    } else {
        generateShareIdQuery = 'UPDATE surveys SET share_id = $1 WHERE survey_id = $2;';
        generateShareIdParams = [uniqueCode, survey_id];
    }

    query(client, generateShareIdQuery, generateShareIdParams, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            callback(error);
        } else {
            callback(null, response);
        }
    });
}


module.exports = generateShareId;
