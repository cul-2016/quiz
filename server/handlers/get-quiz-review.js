var getQuizReview = require('../lib/getQuizReview');
var client = require('../lib/dbClient');

module.exports = {
    method: 'GET',
    path: '/get-quiz-review',
    handler: (request, reply) => {
        var quiz_id = request.query.quiz_id;
        if (quiz_id !== undefined) {

            quiz_id = parseInt(quiz_id, 10);
            getQuizReview(client, quiz_id, (error, module) => {

                var verdict = error || module;
                reply(verdict);
            });
        } else {
            reply(new Error('quiz_id is not defined'));
        }
    }
};
