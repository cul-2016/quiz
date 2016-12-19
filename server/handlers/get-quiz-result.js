var client = require('../lib/dbClient');
var calculateQuizScore = require('../lib/calculateQuizScore');
var getIsLastQuiz = require('../lib/getIsLastQuiz');
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
            /* istanbul ignore if */
            if (error) {
                console.error(error);
                return reply(error);
            }
            calculateQuizScore(client, user_id, quiz_id, (error, score) => {
                /* istanbul ignore if */
                if (error) {
                    console.error(error);
                    return reply(error);
                }
                setQuizScore(client, user_id, quiz_id, score.raw, (error) => {
                    /* istanbul ignore if */
                    if (error) {
                        console.error(error);
                        return reply(error);
                    }
                    getNewTrophyState(client, user_id, module_id, quiz_id, score.percentage, is_last_quiz, (error, newTrophyState) => {
                        /* istanbul ignore if */
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
