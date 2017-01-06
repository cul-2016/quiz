const client = require('../lib/dbClient.js');
const updateIsLastQuiz = require('../lib/updateIsLastQuiz.js');
const saveQuiz = require('../lib/saveQuiz.js');
const saveQuestions = require('../lib/saveQuestions.js');

module.exports = {
    method: 'POST',
    path: '/save-quiz',
    handler: (request, reply) => {
        const { module_id, quizName, questions } = request.payload;
        const is_last_quiz = request.payload.is_last_quiz === true;

        saveQuiz(client, module_id, quizName, is_last_quiz, (error, quiz_id) => {
            /* istanbul ignore if */
            if (error) {
                console.error(error);
                return reply(error);
            }
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
        });
    }
};
