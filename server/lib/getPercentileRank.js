var getAllAverageScores = require('./getAllAverageScores');

/**
 * Calculates a student's percentile rank
 * Returns the percentile rank {number}
 * @param {object} client - postgres database client
 * @param {number} user_id - user id
 * @param {string} module_id - module id
 * @param {function} callback - a callback function
 */

function getPercentileRank (client, user_id, module_id, callback) { //eslint-disable-line no-unused-vars

    // get all average percentage scores in descending order
    getAllAverageScores(client, module_id, (error, allAverageScores) => { //eslint-disable-line no-unused-vars


    });

    // get the percentile boundaries

    // find which range this student's score falls into

    // locate the user by their id
}

module.exports = getPercentileRank;
