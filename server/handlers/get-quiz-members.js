var getQuizMembers = require('../lib/getQuizMembers');
var client = require('../lib/dbClient');

module.exports = {
    method: 'GET',
    path: '/get-quiz-members',
    handler: (request, reply) => {
        var quiz_id = request.query.quiz_id;
        if (quiz_id !== undefined) {

            quiz_id = parseInt(quiz_id, 10);
            getQuizMembers(client, quiz_id, (error, users) => {
                var verdict = error || users;
                reply(verdict);
            });
        } else {
            reply(new Error('quiz_id is not defined'));
        }
    }
};
