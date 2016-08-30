var saveStudentResponse = require('../lib/saveStudentResponse');
var client = require('../lib/dbClient');

module.exports = {
    method: 'POST',
    path: '/save-student-response',
    handler: (request, reply) => {
        var user_id = request.payload.user_id;
        var quiz_id = request.payload.quiz_id;
        var question_id = request.payload.question_id;
        var response = request.payload.response;
        if (user_id !== undefined && quiz_id !== undefined && question_id !== undefined && response !== undefined) {
            user_id = parseInt(user_id);
            quiz_id = parseInt(quiz_id);
            question_id = parseInt(question_id);
            saveStudentResponse(client, user_id, quiz_id, question_id, response, (error, response) => {
                var verdict = error || response;
                reply(verdict);
            });
        } else {
            reply(new Error('one of the required querystrings is not defined'));
        }
    }
};
