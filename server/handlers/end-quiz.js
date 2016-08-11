var client = require('../lib/dbClient');
var setQuizToPresented = require('../lib/setQuizToPresented');

module.exports = {
    method: 'POST',
    path: '/end-quiz',
    handler: (request, reply) => {

        var quiz_id = request.payload.quiz_id;

        setQuizToPresented(client, quiz_id, (error, result) => {

            var verdict = error || result;
            reply(verdict);
        });
    }
};
