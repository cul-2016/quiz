var getQuizDetailsStudent = require('../lib/getQuizDetailsStudent');
var client = require('../lib/dbClient');

module.exports = {
    method: 'GET',
    path: '/get-quiz-details-student',
    handler: (request, reply) => {

        let { query: { quiz_id, user_id } } = request;

        if ([quiz_id, user_id].indexOf(undefined) === -1) {

            quiz_id = parseInt(quiz_id, 10);
            getQuizDetailsStudent(client, quiz_id, user_id, (error, quizDetails) => {
                var verdict = error || quizDetails;
                reply(verdict);
            });
        } else {
            reply(new Error('quiz_id is not defined'));
        }
    }
};
