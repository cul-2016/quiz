var client = require('../lib/dbClient');
var updateIsLastQuiz = require('../lib/updateIsLastQuiz');
var saveQuiz = require('../lib/saveQuiz');
var saveSurvey = require('../lib/saveSurvey');
var saveQuestions = require('../lib/saveQuestions');

module.exports = {
    method: 'POST',
    path: '/save-quiz',
    handler: (request, reply) => {
        const {
            module_id, name, questions, isSurvey, is_last_quiz = false
        } = request.payload;

        const saveQuestionsFlow = (client, id, { isSurvey }) => {
            if (questions.length === 0) {
                if (!isSurvey && is_last_quiz) {
                    updateIsLastQuiz(client, module_id, id, (error) => {
                        /* istanbul ignore if */
                        if (error) {
                            console.error(error);
                            return reply(error);
                        }
                    });
                }
            } else {
                saveQuestions(client, id, questions, { isSurvey }, (error, response) => {
                    /* istanbul ignore if */
                    if (error) {
                        console.error(error);
                    }
                    var verdict = error || response;
                    return reply(verdict);
                });
            }
        };

        const saveQuestionsCb = ({ isSurvey }) => (error, id) => {
            /* istanbul ignore if */
            if (error) {
                console.error(error);
                return reply(error);
            } else {
                saveQuestionsFlow(client, id, { isSurvey });
            }
        };

        if (isSurvey) {
            saveSurvey(client, module_id, name, saveQuestionsCb({ isSurvey: true }));
        } else {
            saveQuiz(client, module_id, name, is_last_quiz, saveQuestionsCb({ isSurvey: false }));
        }
    }
};
