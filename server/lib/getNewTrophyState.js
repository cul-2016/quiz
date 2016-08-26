var getFirstQuizState = require('./trophy-methods').getFirstQuizState;
var getHighScoreState = require('./trophy-methods').getHighScoreState;
var getOverallAverageState = require('./trophy-methods').getOverallAverageState;

/**
 * Calculates a student's new trophy state on completion of a quiz
 * @param {object} client - postgres database client
 * @param {number} user_id - user id
 * @param {string} module_id - module id
 * @param {number} quiz_id - quiz id
 * @param {function} callback - a callback function
 */

function getNewTrophyState (client, user_id, module_id, quiz_id, score, callback) { //eslint-disable-line no-unused-vars

    var trophies_awarded = [];

    getFirstQuizState(client, user_id, quiz_id, (error, first_quiz) => {

        if (error) {
            console.error(error);
            callback(error);
        }
        trophies_awarded.push(first_quiz);

        getHighScoreState(client, module_id, score.percentage, (error, high_score) => {

            if (error) {
                console.error(error);
                callback(error);
            }
            trophies_awarded.push(high_score);

            getOverallAverageState(client, user_id, module_id, (error, overall_average) => {

                if (error) {
                    console.error(error);
                    callback(error);
                }
                trophies_awarded.push(overall_average);

            });
        });
    });
}

module.exports = getNewTrophyState;
