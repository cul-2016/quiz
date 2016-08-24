var client = require('../lib/dbClient');
var getQuizScore = require('../lib/getQuizScore');
var getNewTrophyState = require('../lib/getNewTrophyState'); //eslint-disable-line no-unused-vars

module.exports = {
    method: 'GET',
    path: '/get-quiz-result',
    handler: (request, reply) => {

        var user_id = request.query.user_id;
        var quiz_id = request.query.quiz_id;

        getQuizScore(client, user_id, quiz_id, (error, result) => {

            var verdict = error || result;
            reply(verdict);
        });
    }
};
