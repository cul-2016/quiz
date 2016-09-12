 var query = require('./query');

 /**
  * Represents a function that updates the quiz
  * @param {object} client - postgres database client
  * @param {number} quiz_id - quiz_id for the given Quiz
  * @param {string} module_id - module_id for the given Quiz
  * @params {string} quizName - quizName for the given Quiz
  * @param {function} callback - a callback function
  */

 function updateQuiz (client, quiz_id, module_id, quizName, is_last_quiz, callback) {

     var queryText = 'UPDATE quizzes SET name = $1, is_last_quiz = $4 WHERE quiz_id = $2 AND module_id = $3;';
     var value = [quizName, quiz_id, module_id, is_last_quiz];

     query(client, queryText, value, (error, response) => {

         if (error) {
             return callback(error);
         }
         return callback(null, response);
     });
 }

 module.exports = updateQuiz;
