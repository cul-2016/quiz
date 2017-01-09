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
const jwt = require('jsonwebtoken');

exports.register = (server, options, next) => {
    const pool = server.app.pool;

    server.route([
        {
            method: 'GET',
            path: '/get-leaderboard',
            handler: (request, reply) => {
                const module_id = request.query.module_id;
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
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    if (error) { return reply(error); }

                    const user_id = decoded.user_details.user_id;
                    const module_id = request.query.module_id;

                    if (!module_id) {
                        return reply(new Error('module_id must be defined'));
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
                                    const data = {
                                        ranking: ranking,
                                        quizzes: quizzes,
                                        participation: participation
                                    };
                                    reply(data);
                                });
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
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    const user_id = decoded.user_details.user_id;
                    const module_id = request.query.module_id;

                    if (!module_id) {
                        return reply(new Error('module_id must be defined'));
                    }

                    getStudentHistory(pool, user_id, module_id, (error, history) => {
                        const verdict = error || history;
                        reply(verdict);
                    });
                });

            }
        },
        {
            method: 'GET',
            path: '/get-module-list',
            handler: (request, reply) => {
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    if (error) { return reply(error); }

                    const user_id = decoded.user_details.user_id;
                    const is_lecturer = decoded.user_details.is_lecturer;
                    getModuleList(pool, user_id, is_lecturer, (error, modules) => {
                        const verdict = error || modules;
                        reply(verdict);
                    });
                });
            }
        },
        {
            method: 'GET',
            path: '/get-module',
            handler: (request, reply) => {
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {

                    const module_id = request.query.module_id,
                        is_lecturer = decoded.user_details.is_lecturer,
                        user_id = decoded.user_details.user_id;
                    if (is_lecturer) {
                        getModuleForLecturer(pool, request.query.module_id, (error, module) => {
                            const verdict = error || module;
                            reply(verdict);
                        });
                    } else {
                        getModuleForStudent(pool, user_id, module_id, (error, module) => {
                            const verdict = error || module;
                            reply(verdict);
                        });
                    }
                });
            }
        },
        {
            method: 'GET',
            path: '/validate-module',
            handler: (request, reply) => {
                const module_id = request.query.module_id;
                validateModuleID(pool, module_id, (error, exists) => {

                    const verdict = error || exists;
                    reply(verdict);
                });
            }
        },
        {
            method: 'POST',
            path: '/add-new-module',
            handler: (request, reply) => {
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    const user_id = decoded.user_details.user_id;
                    const data = request.payload;

                    saveModule(pool, data.module_id, user_id, data.name, data.medals, data.trophies, (error, result) => {
                        const verdict = error || result;
                        reply(verdict);
                    });
                });
            }
        },
        {
            method: 'get',
            path: '/join-module',
            handler: (request, reply) => {
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {

                    const module_id = request.query.module_id;
                    let user_id = decoded.user_details.user_id;
                    if (module_id !== undefined) {

                        user_id = parseInt(user_id);
                        joinModule(pool, module_id, user_id, (error, result) => {
                            const verdict = error || result;
                            reply(verdict);
                        });
                    } else {
                        reply(new Error('module_id is not defined'));
                    }
                });
            }
        },
        {
            method: 'GET',
            path: '/get-module-members',
            handler: (request, reply) => {
                const module_id = request.query.module_id;

                if (module_id !== undefined) {
                    getModuleMembers(pool, module_id, (error, users) => {
                        const verdict = error || users;
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
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    const module_id = request.query.module_id;
                    let user_id = decoded.user_details.user_id;

                    if (module_id !== undefined) {
                        user_id = parseInt(user_id);

                        removeModuleMember(pool, module_id, user_id, (error, modules) => {
                            const verdict = error || modules;
                            reply(verdict);
                        });
                    } else {
                        reply(new Error('module_id is not defined'));
                    }
                });
            }
        }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'modules' } };
