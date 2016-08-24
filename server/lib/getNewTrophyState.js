var getFirstQuizState = require('./trophy-methods').getFirstQuizState; //eslint-disable-line no-unused-vars
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
    });
}

module.exports = getNewTrophyState;
