var client = require('../lib/dbClient');
var updateIsLastQuiz = require('../lib/updateIsLastQuiz');
var saveQuiz = require('../lib/saveQuiz');
var saveQuestions = require('../lib/saveQuestions');

module.exports = {
    method: 'POST',
    path: '/save-quiz',
    handler: (request, reply) => {
        var module_id = request.payload.module_id;
        var quizName = request.payload.quizName;
        var questions = request.payload.questions;
        var is_last_quiz = request.payload.is_last_quiz === true;

        saveQuiz(client, module_id, quizName, is_last_quiz, (error, quiz_id) => {
            if (is_last_quiz) {
                updateIsLastQuiz(client, module_id, quiz_id, (error) => {

                    if (error) {
                        console.error(error);
                        return reply(error);
                    }
                });
            }


            if (error) {
                console.error(error);
                return reply(error);
            }
            var mappedQuestions = questions.map((question) => {
                question.quiz_id = quiz_id;
                return question;
            });

            saveQuestions(client, mappedQuestions, (error, response) => {
                //reply here.
                if (error) {
                    console.error(error);
                }
                var verdict = error || response;
                return reply(verdict);
            });
        });
    }
};
