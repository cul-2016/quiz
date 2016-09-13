var query = require('./query');
var queries = require('./queries.json');

/**
 * Calculates if a student is to be awarded a `first quiz` trophy
 * @param {object} client - postgres database client
 * @param {number} user_id - user id
 * @param {number} quiz_id - quiz id
 * @param {function} callback - a callback function
 */

function getFirstQuizState (client, user_id, quiz_id, callback) {

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

    query(client, queries.getHighScoreState, [module_id], (error, result) => {

        if (error) {
            throw new Error("Problem with getting high score");
        }
        var threshold = result.rows[0].condition;

        callback(null, percentageScore >= threshold);
    });
}

/**
 * Calculates if a student is to be awarded an `overall average` trophy
 * @param {object} client - postgres database client
 * @param {number} user_id - student's user id
 * @param {string} module_id - module id
 * @param {function} callback - a callback function
 */

function getOverallAverageState (client, user_id, module_id, callback) {

    query(client, queries.getOverallAverageState.data, [user_id, module_id], (error, result) => {

        if (error) {
            console.error(error);
            callback(new Error("Problem with getting overall average data"));
        }
        var overall_average = result.rows[0].overall_average;

        query(client, queries.getOverallAverageState.condition, [module_id], (error, condition) => {

            if (error) {
                console.error(error);
                callback(new Error("Problem with getting overall average data"));
            }
            var threshold = condition.rows[0].condition;

            callback(null, overall_average >= threshold);
        });
    });
}

/**
 * Calculates if a student is to be awarded an `overall average` trophy
 * @param {object} client - postgres database client
 * @param {number} user_id - student's user id
 * @param {string} module_id - module id
 * @param {function} callback - a callback function
 */

function getParticipationState (client, user_id, module_id, callback) {


    query(client, queries.getParticipationState.data, [user_id, module_id], (error, result) => {

        if (error) {
            console.error(error);
            callback(new Error("Problem with getting participation data"));
        }
        var participation = result.rows[0].participation;

        query(client, queries.getParticipationState.condition, [module_id], (error, condition) => {

            if (error) {
                console.error(error);
                callback(new Error("Problem with getting participation data"));
            }
            var threshold = condition.rows[0].condition;

            callback(null, participation >= threshold);
        });
    });
}


module.exports = {
    getFirstQuizState: getFirstQuizState,
    getHighScoreState: getHighScoreState,
    getOverallAverageState: getOverallAverageState,
    getParticipationState: getParticipationState
};
