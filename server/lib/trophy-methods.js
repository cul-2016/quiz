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
        /* istanbul ignore if */
        if (error) {
            return callback(new Error("Problem with getting first quiz state"));
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

function getHighScoreState (client, user_id, module_id, percentageScore, callback) {

    query(client, queries.getHighScoreState.getCurrentHighScore, [user_id, module_id], (error, result1) => {
        /* istanbul ignore if */
        if (error) {
            return callback(new Error("Problem with getting high score"));
        }
        var high_score = result1.rows[0].high_score;

        if (high_score) {
            return callback(null, true);
        } else {
            query(client, queries.getHighScoreState.getCondition, [module_id], (error, result2) => {
                /* istanbul ignore if */
                if (error) {
                    return callback(new Error("Problem with getting high score"));
                }
                var threshold = result2.rows[0].condition;

                callback(null, percentageScore >= threshold);
            });
        }
    });
}

/**
 * Calculates if a student is to be awarded an `overall average` trophy
 * @param {object} client - postgres database client
 * @param {number} user_id - student's user id
 * @param {string} module_id - module id
 * @param {function} callback - a callback function
 */

// No Longer using it, but want to keep this in here
// function getOverallAverageState (client, user_id, module_id, callback) {
//
//     query(client, queries.getOverallAverageState.data, [user_id, module_id], (error, result) => {
//
//         if (error) {
//             console.error(error);
//             return callback(new Error("Problem with getting overall average data"));
//         }
//         var overall_average = result.rows[0].overall_average;
//
//         query(client, queries.getOverallAverageState.condition, [module_id], (error, condition) => {
//
//             if (error) {
//                 console.error(error);
//                 return callback(new Error("Problem with getting overall average data"));
//             }
//             var threshold = condition.rows[0].condition;
//
//             callback(null, overall_average >= threshold);
//         });
//     });
// }


/**
 * Calculates if a student is to be awarded an `overall score` trophy
 * @param {object} client - postgres database client
 * @param {number} user_id - student's user id
 * @param {string} module_id - module id
 * @param {function} callback - a callback function
 */

function getOverallScoreState (client, user_id, module_id, callback) {

    query(client, queries.getOverallScoreState.hasMetOverallScore, [user_id, module_id], (error, hasMetOverallScore) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(new Error("Problem with getting overall Score data"));
        }

        if (hasMetOverallScore.rows[0].overall_score) {
            return callback(null, true);
        } else {
            query(client, queries.getOverallScoreState.data, [user_id, module_id], (error, result) => {
                /* istanbul ignore if */
                if (error) {
                    console.error(error);
                    return callback(new Error("Problem with getting overall Score data"));
                }

                var overall_score = result.rows[0].overall_score;

                query(client, queries.getOverallScoreState.condition, [module_id], (error, condition) => {
                    /* istanbul ignore if */
                    if (error) {
                        console.error(error);
                        return callback(new Error("Problem with getting overall score data"));
                    }
                    var threshold = condition.rows[0].condition;

                    callback(null, overall_score >= threshold);
                });
            });
        }
    });
}

/**
 * Calculates if a student is to be awarded an `participation` trophy
 * @param {object} client - postgres database client
 * @param {number} user_id - student's user id
 * @param {string} module_id - module id
 * @param {function} callback - a callback function
 */

function getParticipationState (client, user_id, module_id, callback) {

    query(client, queries.getParticipationState.hasMetParticipation, [user_id, module_id], (error, hasMetParticipation) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(new Error("Problem with getting participation data"));
        }

        if (hasMetParticipation.rows[0].participation) {
            return callback(null, true);
        } else {
            query(client, queries.getParticipationState.data, [user_id, module_id], (error, result) => {
                /* istanbul ignore if */
                if (error) {
                    console.error(error);
                    return callback(new Error("Problem with getting participation data"));
                }
                var participation = result.rows[0].participation;

                query(client, queries.getParticipationState.condition, [module_id], (error, condition) => {
                    /* istanbul ignore if */
                    if (error) {
                        console.error(error);
                        return callback(new Error("Problem with getting participation data"));
                    }
                    var threshold = condition.rows[0].condition;

                    callback(null, participation >= threshold);
                });
            });
        }
    });

}


module.exports = {
    getFirstQuizState: getFirstQuizState,
    getHighScoreState: getHighScoreState,
    getOverallScoreState: getOverallScoreState,
    getParticipationState: getParticipationState
};
