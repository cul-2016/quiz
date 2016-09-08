var getMeanQuizScores = require('./getMeanQuizScores');
var getQuizScores = require('./getQuizScores');


/**
 * Returns an object with a student's best and worst quiz
 * 'Best' and 'worst' quiz are defined as when a student's score has the greatest signed deviation from the quiz's mean score
 * @param {object} client - database client
 * @param {number} user_id - user id
 * @param {string} module_id - unique module id
 * @param {function} callback - callback function
 */


function getBestAndWorstQuiz (client, user_id, module_id, callback) { //eslint-disable-line no-unused-vars

    // get this student's scores
    getQuizScores(client, user_id, module_id, (error, studentScores) => { //eslint-disable-line no-unused-vars

        getMeanQuizScores(client, user_id, module_id, (error, meanScores) => { //eslint-disable-line no-unused-vars

            // work out difference
        });
    });
}

module.exports = getBestAndWorstQuiz;
