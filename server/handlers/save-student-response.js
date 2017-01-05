var saveStudentResponse = require('../lib/saveStudentResponse');
var client = require('../lib/dbClient');

module.exports = {
    method: 'POST',
    path: '/save-student-response',
    handler: (request, reply) => {
        let {
            user_id, quiz_id = null, survey_id = null, question_id, response: studentResponse
        } = request.payload;

        const checkExists = el => el !== undefined && el !== null;

        if (
            [user_id, question_id, studentResponse].every(checkExists) &&
            [quiz_id, survey_id].some(checkExists)
        ) {
            user_id = parseInt(user_id);
            quiz_id = quiz_id && parseInt(quiz_id);
            survey_id = survey_id && parseInt(survey_id);

            question_id = parseInt(question_id);
            saveStudentResponse(client, user_id, quiz_id, survey_id, question_id, studentResponse, (error, response) => {
                /* istanbul ignore if */
                if (error) {
                    console.error(error);
                }
                var verdict = error || response;
                reply(verdict);
            });
        } else {
            reply(new Error('one of the required querystrings is not defined'));
        }
    }
};
