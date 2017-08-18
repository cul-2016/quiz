var getFirstQuizState = require('./trophy-methods').getFirstQuizState;
var getHighScoreState = require('./trophy-methods').getHighScoreState;
var getOverallScoreState = require('./trophy-methods').getOverallScoreState;
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

function getNewTrophyState (client, user_id, module_id, quiz_id, percentageScore, callback) {

    if (arguments.length !== 6) {
        throw new Error("`getNewTrophyState`: Incorrect number of arguments");
    }

    var trophies_awarded = {};

    getFirstQuizState(client, user_id, quiz_id, (error, first_quiz) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        trophies_awarded.first_quiz = first_quiz;

        getHighScoreState(client, user_id, module_id, percentageScore, (error, high_score) => {
            /* istanbul ignore if */
            if (error) {
                console.error(error);
                return callback(error);
            }
            trophies_awarded.high_score = high_score;



            getParticipationState(client, user_id, module_id, (error, participation) => {
                /* istanbul ignore if */
                if (error) {
                    console.error(error);
                    return callback(error);
                }
                trophies_awarded.participation = participation;

                getOverallScoreState(client, user_id, module_id, (error, overall_score) => {
                    /* istanbul ignore if */
                    if (error) {
                        console.error(error);
                        return callback(error);
                    }
                    trophies_awarded.overall_score = overall_score;
                    callback(null, trophies_awarded);
                });
            });
        });
    });
}

module.exports = getNewTrophyState;
