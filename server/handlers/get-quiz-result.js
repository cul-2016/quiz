var client = require('../lib/dbClient');
var getIsLastQuiz = require('../lib/getIsLastQuiz');
var getQuizScore = require('../lib/getQuizScore');
var setQuizScore = require('../lib/setQuizScore');
var getNewTrophyState = require('../lib/getNewTrophyState');
var setNewTrophyState = require('../lib/setNewTrophyState');

module.exports = {
    method: 'GET',
    path: '/get-quiz-result',
    handler: (request, reply) => {

        var user_id = request.query.user_id;
        var module_id = request.query.module_id;
        var quiz_id = request.query.quiz_id;

        getIsLastQuiz(client, quiz_id, (error, is_last_quiz) => {

            if (error) {
                console.error(error);
                return reply(error);
            }
            getQuizScore(client, user_id, quiz_id, (error, score) => {

                if (error) {
                    console.error(error);
                    return reply(error);
                }
                setQuizScore(client, user_id, quiz_id, score.raw, (error) => {

                    if (error) {
                        console.error(error);
                        return reply(error);
                    }
                    getNewTrophyState(client, user_id, module_id, quiz_id, score.percentage, is_last_quiz, (error, newTrophyState) => {

                        if (error) {
                            console.error(error);
                            return reply(error);
                        }
                        setNewTrophyState(client, user_id, module_id, newTrophyState, (error) => {

                            var verdict = error || { newTrophyState: newTrophyState, score: score };
                            reply(verdict);
                        });
                    });
                });
            });
        });
    }
};
