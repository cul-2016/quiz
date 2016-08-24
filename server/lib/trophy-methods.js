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

/**
 * Calculates if a student is to be awarded a `high score` trophy
 * @param {object} client - postgres database client
 * @param {string} module_id - module id
 * @param {number} score - student's score on the current quiz
 * @param {function} callback - a callback function
 */

function getHighScoreState (client, module_id, percentageScore, callback) {

    query(client, queries.getHighScoreState, [module_id], (error, high_score) => {

        if (error) {
            throw new Error("Problem with getting high score");
        }
        var highScoreState = percentageScore >= high_score.rows[0].condition;
        callback(null, highScoreState);
    });
}


module.exports = {
    getFirstQuizState: getFirstQuizState,
    getHighScoreState: getHighScoreState
};
