var getAllAverageScores = require('./getAllAverageScores');
var getPercentileValues = require('./getPercentileValues');
var getStudentAverageScore = require('./getStudentAverageScore');
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

function getPercentile (client, user_id, module_id, callback) {

    // get all average percentage scores in descending order
    getAllAverageScores(client, module_id, (error, allAverageScores) => {

        if (error) {
            return callback(error);
        }
        // get the percentile boundary values
        getPercentileValues(allAverageScores, BOUNDARIES, (error, values) => {

            if (error) {
                return callback(error);
            }
            getStudentAverageScore(user_id, allAverageScores, (error, studentScore) => {

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

module.exports = getPercentile;
