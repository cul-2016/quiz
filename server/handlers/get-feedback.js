var client = require('../lib/dbClient');
var getRanking = require('../lib/getRanking');
var getBestAndWorstQuiz = require('../lib/getBestAndWorstQuiz');
var getParticipationRate = require('../lib/getParticipationRate');


module.exports = {
    method: 'GET',
    path: '/get-feedback',
    handler: (request, reply) => {

        var user_id = request.query.user_id;
        var module_id = request.query.module_id;

        if (!user_id || !module_id) {
            console.error('user_id and module_id must be defined');
            return reply(new Error('user_id and module_id must be defined'));
        }

        // ranking
        getRanking(client, user_id, module_id, (error, ranking) => {
            console.log(error, "got ranking", ranking);
            if (error) {
                return reply(error);
            }
            // strengths weaknesses
            getBestAndWorstQuiz(client, user_id, module_id, (error, quizzes) => {
                console.log(error, "got quizzes", quizzes);
                if (error) {
                    return reply(error);
                }
                // participation
                getParticipationRate(client, user_id, module_id, (error, participation) => {
                    console.log(error, "got participation", participation);
                    if (error) {
                        return reply(error);
                    }
                    var data = {
                        ranking: ranking,
                        quizzes: quizzes,
                        participation: participation
                    };
                    reply(data);
                });
            });
        });
    }
};
