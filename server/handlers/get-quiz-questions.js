var getQuizQuestions = require('../lib/getQuizQuestions');
var client = require('../lib/dbClient');

module.exports = {
    method: 'GET',
    path: '/get-quiz-questions',
    handler: (request, reply) => {
        var quiz_id = request.query.quiz_id;
        if (quiz_id !== undefined) {

            quiz_id = parseInt(quiz_id, 10);
            getQuizQuestions(client, quiz_id, (error, questions) => {

                var verdict = error || questions;
                reply(verdict);
            });
        } else {
            reply(new Error('quiz_id is not defined'));
        }
    }
};
