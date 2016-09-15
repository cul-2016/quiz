var query = require('./query');

/**
 * Represents a function that fetches a list of users belonging to a quiz
 * @param {object} client - postgres database client
 * @param {number} quiz_id - quiz id to which all students will belong to
 * @param {function} callback - a callback function
 */

function getQuizMembers (client, quiz_id, callback) {

    var moduleQuery = 'SELECT scores.user_id, users.username, users.email, scores.score FROM scores INNER JOIN users ON scores.user_id = users.user_id WHERE quiz_id = $1 order by users.email;';
    var moduleValue = [quiz_id];



    query(client, moduleQuery, moduleValue, (error, response) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = getQuizMembers;
