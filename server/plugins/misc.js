const saveStudentResponse = require('../lib/saveStudentResponse');
const getTotalScoresAndTrophies = require('../lib/getTotalScoresAndTrophies');
const getScoresForLeaderboard = require('../lib/getScoresForLeaderboard');
const getQuizIDList = require('../lib/getQuizIDList');
const getRanking = require('../lib/getRanking');
const hasStudentSubmitted = require('../lib/hasStudentSubmitted');
const getBestAndWorstQuiz = require('../lib/getBestAndWorstQuiz');
const getParticipationRate = require('../lib/getParticipationRate');
const getStudentHistory = require('../lib/getStudentHistory.js');
const client = require('../lib/dbClient');

exports.register = (server, options, next) => {
    server.route([
        {
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
        },
        {
            method: 'GET',
            path: '/get-leaderboard',
            handler: (request, reply) => {
                var module_id = request.query.module_id;
                if (module_id !== undefined) {

                    getTotalScoresAndTrophies(client, module_id, (error, mainData) => {
                        /* istanbul ignore if */
                        if (error) {
                            return reply(error);
                        }
                        getScoresForLeaderboard(client, module_id, (error, scores) => {
                            /* istanbul ignore if */
                            if (error) {
                                return reply(error);
                            }
                            getQuizIDList(client, module_id, (error, quiz_id_list) => {
                                /* istanbul ignore if */
                                if (error) {
                                    return reply(error);
                                }
                                reply({
                                    medalScores: scores,
                                    mainData: mainData,
                                    quiz_id_list: quiz_id_list
                                });
                            });
                        });
                    });
                } else {
                    reply(new Error('module_id is not defined'));
                }
            }
        },
        {
            method: 'GET',
            path: '/get-feedback',
            handler: (request, reply) => {

                var user_id = request.query.user_id;
                var module_id = request.query.module_id;

                if (!user_id || !module_id) {
                    console.error('user_id and module_id must be defined');
                    return reply(new Error('user_id and module_id must be defined'));
                }
                hasStudentSubmitted(client, user_id, module_id, (error, hasSubmittedBefore) => {
                    /* istanbul ignore if */
                    if (error) {
                        return reply(error);
                    }
                    if (!hasSubmittedBefore) {
                        return reply(null);
                    }
                    getRanking(client, user_id, module_id, (error, ranking) => {
                        /* istanbul ignore if */
                        if (error) {
                            return reply(error);
                        }
                        getBestAndWorstQuiz(client, user_id, module_id, (error, quizzes) => {
                            /* istanbul ignore if */
                            if (error) {
                                return reply(error);
                            }
                            getParticipationRate(client, user_id, module_id, (error, participation) => {
                                /* istanbul ignore if */
                                if (error) {
                                    return reply(error);
                                }
                                var data = {
                                    ranking: ranking,
                                    quizzes: quizzes,
                                    participation: participation
                                };
                                reply(data);
                            });
                        });
                    });
                });
            }
        },
        {
            method: 'GET',
            path: '/get-student-history',
            handler: (request, reply) => {

                var user_id = request.query.user_id;
                var module_id = request.query.module_id;

                if (!module_id || !user_id) {
                    return reply(new Error('module_id and user_id must be defined'));
                }

                getStudentHistory(client, user_id, module_id, (error, history) => {
                    var verdict = error || history;
                    reply(verdict);
                });
            }
        }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'misc' } };
