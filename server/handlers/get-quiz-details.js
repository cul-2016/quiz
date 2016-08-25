var getQuizDetails = require('../lib/getQuizDetails');
var client = require('../lib/dbClient');

module.exports = {
    method: 'GET',
    path: '/get-quiz-details',
    handler: (request, reply) => {
        var quiz_id = request.query.quiz_id;
        if (quiz_id !== undefined) {

            quiz_id = parseInt(quiz_id, 10);
            getQuizDetails(client, quiz_id, (error, quizDetails) => {
                var verdict = error || quizDetails;
                reply(verdict);
            });
        } else {
            reply(new Error('quiz_id is not defined'));
        }
    }
};
