var client = require('../lib/dbClient');
var getQuizScore = require('../lib/getQuizScore');
var getNewTrophyState = require('../lib/getNewTrophyState'); //eslint-disable-line no-unused-vars

module.exports = {
    method: 'GET',
    path: '/get-quiz-result',
    handler: (request, reply) => {

        var user_id = request.query.user_id;
        var module_id = request.query.module_id;
        var quiz_id = request.query.quiz_id;

        getQuizScore(client, user_id, quiz_id, (error, score) => {

            if (error) {
                return reply(error);
            }
            getNewTrophyState(client, user_id, module_id, quiz_id, score, (error, newTrophyState) => {

                var verdict = error || newTrophyState;
                reply(verdict);
            });
        });
    }
};
