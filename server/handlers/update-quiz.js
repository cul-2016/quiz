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
        const {
            module_id, quiz_id, survey_id, name, editedQuestions, newQuestions,
            deletedQuestions, is_last_quiz = false
        } = request.payload;

        const isSurvey = Boolean(survey_id);
        const quizIdOrSurveyId = isSurvey ? quiz_id : survey_id;
        // update quiz name
        updateQuiz(client, module_id, quizIdOrSurveyId, name, is_last_quiz, (error) => {

            if (is_last_quiz) {
                updateIsLastQuiz(client, module_id, quizIdOrSurveyId, (error) => {
                    /* istanbul ignore if */
                    if (error) {
                        console.error(error);
                        return reply(error);
                    }
                });
            }
            /* istanbul ignore if */
            if (error) {
                return reply(error);
            }
            updateQuestions(client, editedQuestions, (error) => {
                /* istanbul ignore if */
                if (error) {
                    console.error(error);
                    return reply(error);
                } else if (newQuestions.length !== 0) {
                    saveQuestions(client, quizIdOrSurveyId, newQuestions, { isSurvey }, (error) => {
                        /* istanbul ignore if */
                        if (error) {
                            console.error(error);
                            return reply(error);
                        } else if (deletedQuestions.length !== 0) {
                            deleteQuestions(client, deletedQuestions, (error) => {
                                /* istanbul ignore if */
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
                            /* istanbul ignore if */
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
