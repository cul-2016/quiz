var getTotalScoresAndTrophies = require('../lib/getTotalScoresAndTrophies');
var getScoresForLeaderboard = require('../lib/getScoresForLeaderboard');
var getQuizIDList = require('../lib/getQuizIDList');
var client = require('../lib/dbClient');

module.exports = {
    method: 'GET',
    path: '/get-leaderboard',
    handler: (request, reply) => {
        var module_id = request.query.module_id;
        if (module_id !== undefined) {

            getTotalScoresAndTrophies(client, module_id, (error, mainData) => {

                if (error) {
                    return reply(error);
                }
                getScoresForLeaderboard(client, module_id, (error, scores) => {

                    if (error) {
                        return reply(error);
                    }
                    getQuizIDList(client, module_id, (error, quiz_id_list) => {

                        if (error) {
                            return reply(error);
                        }
                        reply({
                            medalScores: scores,
                            mainData: mainData,
                            quiz_id_list: quiz_id_list
                        });
                    });
                });
            });
        } else {
            reply(new Error('module_id is not defined'));
        }
    }
};
