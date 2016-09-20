var client = require('../lib/dbClient');
var deleteResponses = require('../lib/deleteResponses');

module.exports = {
    method: 'GET',
    path: '/abort-quiz',
    handler: (request, reply) => {

        var quiz_id = parseInt(request.query.quiz_id);

        deleteResponses(client, quiz_id, (error, result) => {

            var verdict = error || result;
            reply(verdict);
        });
    }
};
