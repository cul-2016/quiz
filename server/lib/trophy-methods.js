var query = require('./query');
var queries = require('./queries.json');


function getFirstQuizState (client, user_id, quiz_id, callback) {

    // see if responses exist for this user id where quiz id = quiz_id
    query(client, queries.getFirstQuizState, [user_id, quiz_id], (error, result) => {

        if (error) {
            throw new Error();
        }
        callback(null, result.rowCount > 0);
    });
}


module.exports = {
    getFirstQuizState: getFirstQuizState
};
