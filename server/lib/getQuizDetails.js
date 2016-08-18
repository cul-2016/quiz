var query = require('./query');

/**
 * Fetches quiz information from the database.
 * Returns an object of arrays. Keys: 'name', 'questions'.
 * @param {object} client - database client
 * @param {string} quiz_id - unique quiz id
 * @param {function} callback - callback function
 */

function getQuizDetails (client, quiz_id, callback) {

    var questionsQuery = 'SELECT question, a as A, b as B, c as C, d as D, correct_answer FROM questions WHERE quiz_id = $1;';
    query(client, questionsQuery, [quiz_id], (error, questions) => {

        if (error) {
            console.error(error);
            return callback(error);
        }
        var nameQuery = 'SELECT name FROM quizzes WHERE quiz_id = $1;';
        query(client, nameQuery, [quiz_id], (error, name) => {

            if (error) {
                console.error(error);
                return callback(error);
            }

            const allData = {
                name: name.rows[0].name,
                questions: questions.rows,
            };
            callback(null, allData);
        });
    });
}

module.exports = getQuizDetails;
