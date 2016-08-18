var client = require('../lib/dbClient');
var getQuizResult = require('../lib/getQuizResult');

module.exports = {
    method: 'GET',
    path: '/get-quiz-result',
    handler: (request, reply) => {

        var user_id = request.query.user_id;
        var quiz_id = request.query.quiz_id;

        getQuizResult(client, user_id, quiz_id, (error, result) => {

            var verdict = error || result;
            reply(verdict);
        });
    }
};
