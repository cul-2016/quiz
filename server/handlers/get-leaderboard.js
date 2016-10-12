var getTotalScoresAndTrophies = require('../lib/getTotalScoresAndTrophies');
var getScoresForLeaderboard = require('../lib/getScoresForLeaderboard');
var client = require('../lib/dbClient');

module.exports = {
    method: 'GET',
    path: '/get-leaderboard',
    handler: (request, reply) => {
        var module_id = request.query.module_id;
        if (module_id !== undefined) {

            getTotalScoresAndTrophies(client, module_id, (error, main) => {

                if (error) {
                    return reply(error);
                }
                getScoresForLeaderboard(client, module_id, (error, scores) => {

                    if (error) {
                        return reply(error);
                    }
                    reply({
                        scores: scores,
                        main: main
                    });
                });
            });
        } else {
            reply(new Error('module_id is not defined'));
        }
    }
};
