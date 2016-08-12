var query = require('./query');

/**
 * Represents a function that fetches a list of questions that belong to a quiz_id along with all the responses for each questions
 * @param {object} client - postgres database client
 * @param {integer} quiz_id - quiz id
 * @param {function} callback - a callback function
 */

function reviewQuiz (client, quiz_id, callback) {

    var moduleQuery = "SELECT DISTINCT questions.quiz_id, questions.question_id, questions.question, questions.a, questions.b, questions.c, questions.d, questions.correct_answer, ( SELECT COUNT(case when responses.response = 'A' then 1 end) AS a_response FROM responses WHERE responses.question_id = questions.question_id GROUP BY responses.question_id ), ( SELECT COUNT(case when responses.response = 'B' then 1 end) AS b_response FROM responses WHERE responses.question_id = questions.question_id GROUP BY questions.question_id ), ( SELECT COUNT(case when responses.response = 'C' then 1 end) AS c_response FROM responses WHERE responses.question_id = questions.question_id GROUP BY questions.question_id ), ( SELECT COUNT(case when responses.response = 'D' then 1 end) AS d_response FROM responses WHERE responses.question_id = questions.question_id GROUP BY questions.question_id ) FROM questions LEFT JOIN responses ON questions.question_id = responses.question_id WHERE questions.quiz_id = $1 ORDER BY questions.question_id;";

    var moduleValue = [quiz_id];

    query(client, moduleQuery, moduleValue, (error, response) => {

        if (error) {
            console.error(error);
            callback(error);
        }
        callback(null, response.rows);
    });
}

module.exports = reviewQuiz;
