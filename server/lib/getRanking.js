var getAllPercentageScores = require('./getAllPercentageScores');
var getPercentileValues = require('./getPercentileValues');
var getStudentPercentageScore = require('./getStudentPercentageScore');
var getBoundaryIndex = require('./getBoundaryIndex');

/**
 * Calculates a student's percentile rank
 * Returns the percentile rank {number}
 * @param {object} client - postgres database client
 * @param {number} user_id - user id
 * @param {string} module_id - module id
 * @param {function} callback - a callback function
 */

const BOUNDARIES = [10, 25, 50, 90, 100];

function getRanking (client, user_id, module_id, callback) {

    // get all average percentage scores in descending order
    getAllPercentageScores(client, module_id, (error, allPercentageScores) => {

        if (error) {
            return callback(error);
        }
        // get the percentile boundary values
        getPercentileValues(allPercentageScores, BOUNDARIES, (error, values) => {

            if (error) {
                return callback(error);
            }
            getStudentPercentageScore(user_id, allPercentageScores, (error, studentScore) => {

                if (error) {
                    return callback(error);
                }
                getBoundaryIndex(studentScore, values, (error, index) => {

                    if (error) {
                        return callback(error);
                    }
                    callback(null, BOUNDARIES[index]);
                });
            });
        });
    });
}

module.exports = getRanking;
