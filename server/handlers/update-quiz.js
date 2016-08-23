var client = require('../lib/dbClient');
var updateQuiz = require('../lib/updateQuiz');
var updateQuestions = require('../lib/updateQuestions');
var saveQuestions = require('../lib/saveQuestions');
var deleteQuestions = require('../lib/deleteQuestions');

module.exports = {
    method: 'POST',
    path: '/update-quiz',
    handler: (request, reply) => {
        var module_id = request.payload.module_id;
        var quiz_id = request.payload.quiz_id;
        var quizName = request.payload.quizName;
        var editedQuestions = request.payload.editedQuestions;
        var newQuestions = request.payload.newQuestions;
        var deletedQuestions = request.payload.deletedQuestions;



        // update quiz name
        updateQuiz(client, quiz_id, module_id, quizName, (error, quizResponse) => {

            if (error) {
                return reply(error);
            }
            updateQuestions(client, editedQuestions, (error, updateQuestionsResponse) => {

                if (error) {
                    return reply(error);
                } else if (newQuestions.length !== 0) {
                    saveQuestions(client, newQuestions, (error, newQuizResponse) => {

                        if (error) {
                            return reply(error);
                        } else if (deletedQuestions.length !== 0) {
                            deleteQuestions(client, deletedQuestions, (error, deleteQuestionsResponse) => {

                                if (error) {
                                    return reply(error);
                                }
                                return reply('made it to the end');
                            });
                        } else {
                            return reply('made it to the end');
                        }
                    });
                } else {
                    if (deletedQuestions.length !== 0) {
                        deleteQuestions(client, deletedQuestions, (error, deleteQuestionsResponse) => {
                            if (error) {
                                return reply(error);
                            }
                            return reply('made it to the end');
                        });
                    }
                    return reply(true);
                }
            });
        });
    }
};
