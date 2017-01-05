var client = require('../lib/dbClient');
var updateIsLastQuiz = require('../lib/updateIsLastQuiz');
var saveQuiz = require('../lib/saveQuiz');
var saveQuestions = require('../lib/saveQuestions');

module.exports = {
    method: 'POST',
    path: '/save-quiz',
    handler: (request, reply) => {
        const {
            module_id, quizName, questions, isSurvey, is_last_quiz = false
        } = request.payload;

        if (isSurvey) {
            // perform save survey query
            // saveQuestionsFlow(client, quiz_id);
        } else {
            saveQuiz(client, module_id, quizName, is_last_quiz, (error, quiz_id) => {
                /* istanbul ignore if */
                if (error) {
                    console.error(error);
                    return reply(error);
                } else {
                    saveQuestionsFlow(client, quiz_id);
                }
            });
        }
        
        const saveQuestionsFlow = (client, quiz_id) => {
            if (questions.length === 0) {
                if (is_last_quiz) {
                    updateIsLastQuiz(client, module_id, quiz_id, (error) => {
                        /* istanbul ignore if */
                        if (error) {
                            console.error(error);
                            return reply(error);
                        }
                    });
                }
            } else {
                var mappedQuestions = questions.map((question) => {
                    question.quiz_id = quiz_id;
                    return question;
                });
                saveQuestions(client, mappedQuestions, (error, response) => {
                    /* istanbul ignore if */
                    if (error) {
                        console.error(error);
                    }
                    var verdict = error || response;
                    return reply(verdict);
                });
            }
        };
    }
};
