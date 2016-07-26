var client = require('../lib/dbClient');

module.exports = {
    method: 'POST',
    path: '/save-quiz',
    handler: (request, reply) => {
        var module_id = request.payload.module_id;
        var quizName = request.payload.quizName;
        var questions = request.payload.questions;

        saveQuiz(client, module_id, quizName, () => {
            
        })
    }
}
