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
const generateShareId = require('../lib/generateShareId.js');
const submitImportCode = require('../lib/submitImportCode.js');

const jwt = require('jsonwebtoken');
const Joi = require('joi');

exports.register = (server, options, next) => {
    const { pool } = server.app;

    server.route([
        {
            method: 'GET',
            path: '/get-leaderboard',
            config: {
                validate: {
                    query: {
                        module_id: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {
                const { module_id } = request.query;

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
            }
        },
        {
            method: 'GET',
            path: '/get-feedback',
            config: {
                validate: {
                    query: {
                        module_id: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    /* istanbul ignore if */
                    if (error) { return reply(error); }

                    const { user_id } = decoded.user_details;
                    const { module_id } = request.query;

                    /* istanbul ignore if */
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
            config: {
                validate: {
                    query: {
                        module_id: Joi.string().required(),
                        user_id: Joi.string()
                    }
                }
            },
            handler: (request, reply) => {

                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {

                    const { module_id } = request.query;
                    const user_id = request.query.user_id === 'undefined' ? decoded.user_details.user_id : request.query.user_id;
                    const parsed_user_id = parseInt(user_id, 10);
                    getStudentHistory(pool, parsed_user_id, module_id, (error, history) => {
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
                    /* istanbul ignore if */
                    if (error) { return reply(error); }

                    const { user_id, is_lecturer } = decoded.user_details;
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
            config: {
                validate: {
                    query: {
                        module_id: Joi.string().required(),
                        is_lecturer: Joi.string()
                    }
                }
            },
            handler: (request, reply) => {
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    /* istanbul ignore if */
                    if (error) { return reply(error); }

                    const { module_id } = request.query;
                    const { is_lecturer, user_id } = decoded.user_details;

                    if (is_lecturer) {
                        getModuleForLecturer(pool, module_id, (error, module) => {
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
            config: {
                validate: {
                    query: {
                        module_id: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {
                const { module_id } = request.query;

                validateModuleID(pool, module_id, (error, exists) => {

                    const verdict = error || exists;
                    reply(verdict);
                });
            }
        },
        {
            method: 'POST',
            path: '/add-new-module',
            config: {
                validate: {
                    payload: {
                        module_id: Joi.string().required(),
                        name: Joi.string().required(),
                        medals: Joi.object().keys({
                            condition: Joi.array().required(),
                            medal_name: Joi.array().required()
                        }),
                        trophies: Joi.object().keys({
                            condition: Joi.array().required(),
                            trophy_name: Joi.array().required()
                        })
                    }
                }
            },
            handler: (request, reply) => {
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    /* istanbul ignore if */
                    if (error) { return reply(error); }
                    const { user_id } = decoded.user_details;
                    const { module_id, name, medals, trophies } = request.payload;

                    saveModule(pool, module_id, user_id, name, medals, trophies, (error, result) => {
                        const verdict = error || result;
                        reply(verdict);
                    });
                });
            }
        },
        {
            method: 'get',
            path: '/join-module',
            config: {
                validate: {
                    query: {
                        module_id: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    /* istanbul ignore if */
                    if (error) { return reply(error); }

                    const { module_id } = request.query;
                    const { user_id } = decoded.user_details;
                    if (module_id !== undefined) {

                        joinModule(pool, module_id.toUpperCase(), user_id, (error, result) => {
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
            config: {
                validate: {
                    query: {
                        module_id: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {
                const { module_id } = request.query;

                getModuleMembers(pool, module_id, (error, users) => {
                    const verdict = error || users;
                    reply(verdict);
                });
            }
        },
        {
            method: 'GET',
            path: '/remove-module-member',
            config: {
                validate: {
                    query: {
                        module_id: Joi.string().required(),
                        user_id: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {
                const { module_id, user_id } = request.query;

                const parsed_user_id = parseInt(user_id, 10);
                removeModuleMember(pool, module_id, parsed_user_id, (error, modules) => {
                    const verdict = error || modules;
                    reply(verdict);
                });
            }
        },
        {
            method: 'POST',
            path: '/generate-share-id',
            config: {
                validate: {
                    payload: {
                        quiz_id: Joi.number(),
                        survey_id: Joi.number()
                    }
                }
            },
            handler: (request, reply) => {
                const { quiz_id, survey_id } = request.payload;

                generateShareId(pool, quiz_id, survey_id, (error, response) => {

                    const verdict = error || typeof response === 'object';
                    reply(verdict);
                });
            }
        },
        {
            method: 'POST',
            path: '/submit-import-code',
            config: {
                validate: {
                    payload: {
                        import_code: Joi.string(),
                        module_id: Joi.string()
                    }
                }
            },
            handler: (request, reply) => {
                const { import_code, module_id } = request.payload;

                submitImportCode(pool, import_code, module_id, (error, response) => {

                    const verdict = error || typeof response === 'object';
                    reply(verdict);
                });
            }
        }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'modules' } };
