var saveStudentResponse = require('../lib/saveStudentResponse');
var client = require('../lib/dbClient');

module.exports = {
    method: 'POST',
    path: '/save-student-response',
    handler: (request, reply) => {
        let {
            user_id, quiz_id, question_id, response: studentResponse
        } = request.payload;

        if (user_id !== undefined && quiz_id !== undefined && question_id !== undefined && studentResponse !== undefined) {
            user_id = parseInt(user_id);
            quiz_id = parseInt(quiz_id);
            question_id = parseInt(question_id);
            saveStudentResponse(client, user_id, quiz_id, question_id, studentResponse, (error, response) => {
                var verdict = error || response;
                reply(verdict);
            });
        } else {
            reply(new Error('one of the required querystrings is not defined'));
        }
    }
};
