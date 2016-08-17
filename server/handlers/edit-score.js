var editScore = require('../lib/editScore');
var client = require('../lib/dbClient');

module.exports = {
    method: 'GET',
    path: '/edit-score',
    handler: (request, reply) => {
        var quiz_id = request.query.quiz_id;
        var user_id = request.query.user_id;
        var score = request.query.score;
        if (quiz_id !== undefined && user_id !== undefined && score !== undefined) {

            editScore(client, quiz_id, user_id, score, (error, response) => {

                var verdict = error || response;
                reply(verdict);
            });
        } else {
            reply(new Error('quiz_id || user_id || score is not defined'));
        }
    }
};
