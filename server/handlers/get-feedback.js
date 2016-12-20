var client = require('../lib/dbClient');
var getRanking = require('../lib/getRanking');
var hasStudentSubmitted = require('../lib/hasStudentSubmitted');
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
        hasStudentSubmitted(client, user_id, module_id, (error, hasSubmittedBefore) => {
            /* istanbul ignore if */
            if (error) {
                return reply(error);
            }
            if (!hasSubmittedBefore) {
                return reply(null);
            }
            getRanking(client, user_id, module_id, (error, ranking) => {
                /* istanbul ignore if */
                if (error) {
                    return reply(error);
                }
                getBestAndWorstQuiz(client, user_id, module_id, (error, quizzes) => {
                    /* istanbul ignore if */
                    if (error) {
                        return reply(error);
                    }
                    getParticipationRate(client, user_id, module_id, (error, participation) => {
                        /* istanbul ignore if */
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
        });
    }
};
