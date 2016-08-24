var getFirstQuizState = require('./trophy-methods').getFirstQuizState; //eslint-disable-line no-unused-vars
/**
 * Calculates a student's new trophy state on completion of a quiz
 * @param {object} client - postgres database client
 * @param {number} user_id - user id
 * @param {string} module_id - module id
 * @param {number} quiz_id - quiz id
 * @param {function} callback - a callback function
 */

function getNewTrophyState (client, user_id, module_id, quiz_id, callback) { //eslint-disable-line no-unused-vars

    /*

    */
}

module.exports = getNewTrophyState;
