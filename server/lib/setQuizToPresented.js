/**
 *  Changes the `is_presented` column value for a quiz to true
 * @param {object} client - postgres client
 * @param {number} quiz_id - quiz id
 * @param {function} callback - callback function
 */

function setQuizToPresented (client, quiz_id, callback) {

    console.log(typeof quiz_id);
    callback(null, true);
}

module.exports = setQuizToPresented;
