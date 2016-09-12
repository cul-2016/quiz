var getFirstQuizState = require('./trophy-methods').getFirstQuizState;
var getHighScoreState = require('./trophy-methods').getHighScoreState;
var getOverallAverageState = require('./trophy-methods').getOverallAverageState;
var getParticipationState = require('./trophy-methods').getParticipationState;

/**
 * Calculates a student's new trophy state on completion of a quiz
 * @param {object} client - postgres database client
 * @param {number} user_id - user id
 * @param {string} module_id - module id
 * @param {number} quiz_id - quiz id
 * @param {number} percentageScore - the student's score as a percentage
 * @param {boolean} is_last_quiz - if the given quiz is the last quiz
 * @param {function} callback - a callback function
 */

function getNewTrophyState (client, user_id, module_id, quiz_id, percentageScore, is_last_quiz, callback) {

    if (arguments.length !== 7) {
        throw new Error("`getNewTrophyState`: Incorrect number of arguments");
    }

    var trophies_awarded = [];

    getFirstQuizState(client, user_id, quiz_id, (error, first_quiz) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        trophies_awarded.push(first_quiz);

        getHighScoreState(client, module_id, percentageScore, (error, high_score) => {

            if (error) {
                console.error(error);
                return callback(error);
            }
            trophies_awarded.push(high_score);



            getParticipationState(client, user_id, module_id, (error, participation) => {

                if (error) {
                    console.error(error);
                    return callback(error);
                }
                trophies_awarded.push(participation);

                if (is_last_quiz) {
                    getOverallAverageState(client, user_id, module_id, (error, overall_average) => {

                        if (error) {
                            console.error(error);
                            return callback(error);
                        }
                        trophies_awarded.push(overall_average);

                        return callback(null, trophies_awarded);
                    });
                } else {
                    return callback(null, trophies_awarded);
                }
            });
        });
    });
}

module.exports = getNewTrophyState;
