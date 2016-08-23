var client = require('../lib/dbClient');
var updateQuiz = require('../lib/updateQuiz');
var updateQuestions = require('../lib/updateQuestions');
var saveQuestions = require('../lib/saveQuestions');

module.exports = {
    method: 'POST',
    path: '/update-quiz',
    handler: (request, reply) => {
        var module_id = request.payload.module_id;
        var quiz_id = request.payload.quiz_id;
        var quizName = request.payload.quizName;
        var editedQuestions = request.payload.editedQuestions;
        var newQuestions = request.payload.newQuestions;


        console.log(editedQuestions, '......', newQuestions);
        // update quiz name
        updateQuiz(client, quiz_id, module_id, quizName, (error, quizResponse) => {

            if (error) {
                return reply(error);
            }
            updateQuestions(client, editedQuestions, (error, updateQuestionsResponse) => {

                if (error) {
                    return reply(error);
                }
                else if (newQuestions.length !== 0) {
                    saveQuestions(client, newQuestions, (error, newQuizResponse) => {

                        if (error) {
                            return reply(error);
                        }

                        return reply('made it to the end');
                    });
                }
                else {
                    return reply(true);
                }
            });
        });
    }
};
