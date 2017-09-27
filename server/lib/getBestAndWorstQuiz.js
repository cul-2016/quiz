var getMeanQuizScores = require('./getMeanQuizScores.js');
var getQuizScores = require('./getQuizScores.js');
var getSignedDifference = require('./getSignedDifference.js');
var getMinAndMaxValues = require('./getMinAndMaxValues.js');
var mapQuizIDToName = require('./mapQuizIDToName.js');
var MINIMUM_QUIZZES = 3;

/**
 * Returns an object with a student's best and worst quiz
 * 'Best' and 'worst' quiz are defined as when a student's score has the greatest signed deviation from the quiz's mean score
 * Forms part of the data for the `/get-feedback` endpoint
 * @param {object} client - database client
 * @param {number} user_id - user id
 * @param {string} module_id - unique module id
 * @param {function} callback - callback function
 */


function getBestAndWorstQuiz (client, user_id, module_id, callback) {
    // get this student's scores
    getQuizScores(client, user_id, module_id, (error, studentScores) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        if (studentScores.length < MINIMUM_QUIZZES) {
            return callback(null, null);
        }
        // get mean scores for each quiz
        getMeanQuizScores(client, module_id, (error, meanScores) => {
            /* istanbul ignore if */
            if (error) {
                console.error(error);
                return callback(error);
            }
            getSignedDifference(studentScores, meanScores, (error, difference) => {
                /* istanbul ignore if */
                if (error) {
                    console.error(error);
                    return callback(error);
                }
                getMinAndMaxValues(difference, (error, values) => {
                    /* istanbul ignore if */
                    if (error) {
                        console.error(error);
                        return callback(error);
                    }
                    mapQuizIDToName(client, values, module_id, (error, names) => {
                        /* istanbul ignore if */
                        if (error) {
                            console.error(error);
                            return callback(error);
                        }
                        callback(null, names);
                    });
                });
            });
        });
    });
}

module.exports = getBestAndWorstQuiz;
