var client = require('../lib/dbClient');
var updateIsLastQuiz = require('../lib/updateIsLastQuiz');
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
        var is_last_quiz = request.payload.is_last_quiz === true;

        // update quiz name
        updateQuiz(client, module_id, quiz_id, quizName, is_last_quiz, (error) => {

            if (is_last_quiz) {
                updateIsLastQuiz(client, module_id, quiz_id, (error) => {

                    if (error) {
                        console.error(error);
                        return reply(error);
                    }
                });
            }

            if (error) {
                return reply(error);
            }
            updateQuestions(client, editedQuestions, (error) => {

                if (error) {
                    return reply(error);
                } else if (newQuestions.length !== 0) {
                    saveQuestions(client, newQuestions, (error) => {

                        if (error) {
                            return reply(error);
                        } else if (deletedQuestions.length !== 0) {
                            deleteQuestions(client, deletedQuestions, (error) => {

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
                        deleteQuestions(client, deletedQuestions, (error) => {
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
