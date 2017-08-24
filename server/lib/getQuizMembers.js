const query = require('./query');

/**
 * Represents a function that returns a list of students belonging to a quiz
 * @param {object} client - postgres database client
 * @param {number} id - quiz or survey id to which all students will belong to
 * @param {boolean} isSurvey - Boolean value for isSurvey
 * @param {function} callback - a callback function
 */

function getQuizMembers (client, id, isSurvey, callback) {
    let getQuizMembersQuery;
    const idArray = [id];

    if (!isSurvey) {
        getQuizMembersQuery = 'SELECT scores.user_id, users.username, users.email, scores.score FROM scores INNER JOIN users ON scores.user_id = users.user_id WHERE quiz_id = $1 ORDER BY users.email;';
    } else {
        getQuizMembersQuery = 'SELECT DISTINCT responses.user_id, users.username, users.email FROM responses INNER JOIN users ON responses.user_id = users.user_id WHERE survey_id=$1;';
    }
    query(client, getQuizMembersQuery, idArray, (error, response) => {
        /* istanbul ignore if */
        if (error) {
            console.error(error);
            return callback(error);
        }
        return callback(null, response.rows);
    });
}

module.exports = getQuizMembers;
