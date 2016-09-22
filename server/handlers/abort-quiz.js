var client = require('../lib/dbClient');
var deleteResponses = require('../lib/deleteResponses');

module.exports = {
    method: 'GET',
    path: '/abort-quiz',
    handler: (request, reply) => {

        var quiz_id = request.query.quiz_id;

        if (quiz_id !== undefined) {
            quiz_id = parseInt(quiz_id);

            deleteResponses(client, quiz_id, (error, result) => {

                var verdict = error || result;
                reply(verdict);
            });
        } else {
            reply(new Error('quiz_id is not defined'));
        }
    }
};
