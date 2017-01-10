const getModuleList = require('../lib/getModuleList.js');
const getModuleForLecturer = require('../lib/getModuleForLecturer.js');
const getModuleForStudent = require('../lib/getModuleForStudent.js');
const validateModuleID = require('../lib/validateModuleID.js');
const saveModule = require('../lib/saveModule.js');
const getModuleMembers = require('../lib/getModuleMembers.js');
const removeModuleMember = require('../lib/removeModuleMember.js');
const joinModule = require('../lib/joinModule.js');
const getTotalScoresAndTrophies = require('../lib/getTotalScoresAndTrophies');
const getScoresForLeaderboard = require('../lib/getScoresForLeaderboard');
const getQuizIDList = require('../lib/getQuizIDList');
const getRanking = require('../lib/getRanking');
const hasStudentSubmitted = require('../lib/hasStudentSubmitted');
const getBestAndWorstQuiz = require('../lib/getBestAndWorstQuiz');
const getParticipationRate = require('../lib/getParticipationRate');
const getStudentHistory = require('../lib/getStudentHistory.js');

exports.register = (server, options, next) => {
    const pool = server.app.pool;

    server.route([
        {
            method: 'GET',
            path: '/get-leaderboard',
            handler: (request, reply) => {
                var module_id = request.query.module_id;
                if (module_id !== undefined) {

                    getTotalScoresAndTrophies(pool, module_id, (error, mainData) => {
                        /* istanbul ignore if */
                        if (error) {
                            return reply(error);
                        }
                        getScoresForLeaderboard(pool, module_id, (error, scores) => {
                            /* istanbul ignore if */
                            if (error) {
                                return reply(error);
                            }
                            getQuizIDList(pool, module_id, (error, quiz_id_list) => {
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
                hasStudentSubmitted(pool, user_id, module_id, (error, hasSubmittedBefore) => {
                    /* istanbul ignore if */
                    if (error) {
                        return reply(error);
                    }
                    if (!hasSubmittedBefore) {
                        return reply(null);
                    }
                    getRanking(pool, user_id, module_id, (error, ranking) => {
                        /* istanbul ignore if */
                        if (error) {
                            return reply(error);
                        }
                        getBestAndWorstQuiz(pool, user_id, module_id, (error, quizzes) => {
                            /* istanbul ignore if */
                            if (error) {
                                return reply(error);
                            }
                            getParticipationRate(pool, user_id, module_id, (error, participation) => {
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

                getStudentHistory(pool, user_id, module_id, (error, history) => {
                    var verdict = error || history;
                    reply(verdict);
                });
            }
        },
        {
            method: 'GET',
            path: '/get-module-list',
            handler: (request, reply) => {
                var user_id = request.query.user_id;
                var is_lecturer = request.query.is_lecturer;
                if (is_lecturer !== undefined) {

                    is_lecturer = is_lecturer.toLowerCase() === "true";
                    getModuleList(pool, user_id, is_lecturer, (error, modules) => {
                        var verdict = error || modules;
                        reply(verdict);
                    });
                } else {
                    reply(new Error('is_lecturer is not defined'));
                }
            }
        },
        {
            method: 'GET',
            path: '/get-module',
            handler: (request, reply) => {

                let module_id = request.query.module_id,
                    is_lecturer = request.query.is_lecturer,
                    user_id = request.query.user_id;

                if (is_lecturer === undefined) {
                    const error = new Error("`is_lecturer` must be defined");
                    console.error(error);
                    return reply(error);
                }

                if (is_lecturer === 'true') {

                    getModuleForLecturer(pool, request.query.module_id, (error, module) => {

                        var verdict = error || module;
                        reply(verdict);
                    });
                } else {

                    getModuleForStudent(pool, user_id, module_id, (error, module) => {

                        var verdict = error || module;
                        reply(verdict);
                    });
                }
            }
        },
        {
            method: 'GET',
            path: '/validate-module',
            handler: (request, reply) => {
                var module_id = request.query.module_id;
                validateModuleID(pool, module_id, (error, exists) => {

                    var verdict = error || exists;
                    reply(verdict);
                });
            }
        },
        {
            method: 'POST',
            path: '/add-new-module',
            handler: (request, reply) => {

                var user_id = request.query.user_id;
                var data = request.payload;
                
                saveModule(pool, data.module_id, user_id, data.name, data.medals, data.trophies, (error, result) => {

                    var verdict = error || result;
                    reply(verdict);
                });
            }
        },
        {
            method: 'get',
            path: '/join-module',
            handler: (request, reply) => {

                var module_id = request.query.module_id;
                var user_id = request.query.user_id;
                if (module_id !== undefined && user_id !== undefined) {

                    user_id = parseInt(user_id);
                    joinModule(pool, module_id, user_id, (error, result) => {

                        var verdict = error || result;
                        reply(verdict);
                    });
                } else {
                    reply(new Error('module_id or user_id is not defined'));
                }
            }
        },
        {
            method: 'GET',
            path: '/get-module-members',
            handler: (request, reply) => {
                var module_id = request.query.module_id;
                if (module_id !== undefined) {

                    getModuleMembers(pool, module_id, (error, users) => {
                        var verdict = error || users;
                        reply(verdict);
                    });
                } else {
                    reply(new Error('module_id is not defined'));
                }
            }
        },
        {
            method: 'GET',
            path: '/remove-module-member',
            handler: (request, reply) => {
                var module_id = request.query.module_id;
                var user_id = request.query.user_id;
                if (module_id !== undefined && user_id !== undefined) {

                    user_id = parseInt(user_id);
                    removeModuleMember(pool, module_id, user_id, (error, modules) => {
                        var verdict = error || modules;
                        reply(verdict);
                    });
                } else {
                    reply(new Error('module_id or user_id is not defined'));
                }
            }
        }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'modules' } };

