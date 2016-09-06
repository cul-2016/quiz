var client = require('../lib/dbClient');
var saveQuiz = require('../lib/saveQuiz');
var saveQuestions = require('../lib/saveQuestions');

module.exports = {
    method: 'POST',
    path: '/save-quiz',
    handler: (request, reply) => {
        var module_id = request.payload.module_id;
        var quizName = request.payload.quizName;
        var questions = request.payload.questions;


        saveQuiz(client, module_id, quizName, (error, quiz_id) => {


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
