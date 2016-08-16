var client = require('../lib/dbClient');
var getQuizScore = require('../lib/getQuizScore');

module.exports = {
    method: 'GET',
    path: '/get-quiz-score',
    handler: (request, reply) => {

        var user_id = request.query.user_id;
        var quiz_id = request.query.quiz_id;

        getQuizScore(client, user_id, quiz_id, (error, score) => {

            var verdict = error || score;
            reply(verdict);
        });
    }
};
