const saveStudentResponse = require('../lib/saveStudentResponse');
const updateIsLastQuiz = require('../lib/updateIsLastQuiz.js');
const saveQuiz = require('../lib/saveQuiz.js');
const saveSurvey = require('../lib/saveSurvey');
const saveQuestions = require('../lib/saveQuestions.js');
const getQuizQuestions = require('../lib/getQuizQuestions');
const getSurveyQuestions = require('../lib/getSurveyQuestions');
const setQuizOrSurveyToPresented = require('../lib/setQuizOrSurveyToPresented.js');
const calculateQuizScore = require('../lib/calculateQuizScore.js');
const setQuizScore = require('../lib/setQuizScore.js');
const getNewTrophyState = require('../lib/getNewTrophyState.js');
const setNewTrophyState = require('../lib/setNewTrophyState.js');
const getReview = require('../lib/getReview.js');
const getQuizMembers = require('../lib/getQuizMembers.js');
const updateQuizOrSurvey = require('../lib/updateQuizOrSurvey.js');
const updateQuestions = require('../lib/updateQuestions.js');
const deleteQuestions = require('../lib/deleteQuestions.js');
const deleteResponses = require('../lib/deleteResponses.js');
const getQuizDetails = require('../lib/getQuizDetails.js');
const getSurveyDetails = require('../lib/getSurveyDetails.js');
const editScore = require('../lib/editScore.js');
const getQuizDetailsStudent = require('../lib/getQuizDetailsStudent.js').getQuizDetailsStudent;

const jwt = require('jsonwebtoken');
const Joi = require('joi');

exports.register = (server, options, next) => {
    const { pool } = server.app;

    server.route([
        {
            method: 'POST',
            path: '/save-student-response',
            config: {
                validate: {
                    payload: {
                        id: Joi.number().required(),
                        isSurvey: Joi.boolean().required(),
                        question_id: Joi.number().required(),
                        response: Joi.string().required(),
                        user_id: Joi.number()
                    }
                }
            },
            handler: (request, reply) => {
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    /* istanbul ignore if */
                    if (error) { return reply(error); }

                    const { user_id } = decoded.user_details;
                    const { id, isSurvey, question_id, response } = request.payload;

                    saveStudentResponse(pool, user_id, id, isSurvey, question_id, response, (error, response) => {

                        /* istanbul ignore if */
                        if (error) {
                            console.error(error);
                        }
                        const verdict = error || response;

                        reply(verdict);
                    });
                });

            }
        },
        {
            method: 'POST',
            path: '/save-quiz',
            handler: (request, reply) => {
                const { module_id, name, questions, isSurvey, is_last_quiz = false } = request.payload;

                const saveQuestionsFlow = (pool, id, { isSurvey }) => {
                    if (questions.length === 0) {
                        if (!isSurvey && is_last_quiz) {
                            updateIsLastQuiz(pool, module_id, id, (error) => {
                                /* istanbul ignore if */
                                if (error) {
                                    console.error(error);
                                    return reply(error);
                                }
                            });
                        }
                    } else {
                        saveQuestions(pool, id, questions, { isSurvey }, (error, response) => {
                            /* istanbul ignore if */
                            if (error) {
                                console.error(error);
                            }
                            var verdict = error || response;
                            return reply(verdict);
                        });
                    }
                };

                const saveQuestionsCb = ({ isSurvey }) => (error, id) => {
                    /* istanbul ignore if */
                    if (error) {
                        console.error(error);
                        return reply(error);
                    } else {
                        saveQuestionsFlow(pool, id, { isSurvey });
                    }
                };

                if (isSurvey) {
                    saveSurvey(pool, module_id, name, saveQuestionsCb({ isSurvey: true }));
                } else {
                    saveQuiz(pool, module_id, name, is_last_quiz, saveQuestionsCb({ isSurvey: false }));
                }
            }
        },
        {
            method: 'GET',
            path: '/get-quiz-questions',
            config: {
                validate: {
                    query: Joi.alternatives().try(
                        Joi.object().keys({ quiz_id: Joi.string().required() }),
                        Joi.object().keys({ survey_id: Joi.string().required() })
                    )
                }
            },
            handler: (request, reply) => {
                const { quiz_id, survey_id } = request.query;
                if (quiz_id !== undefined) {
                    const parsed_quiz_id = parseInt(quiz_id, 10);
                    getQuizQuestions(pool, parsed_quiz_id, (error, quizQuestions) => {
                        const verdict = error || quizQuestions;
                        reply(verdict);
                    });
                } else {
                    const parsed_survey_id = parseInt(survey_id, 10);
                    getSurveyQuestions(pool, parsed_survey_id, (error, surveyQuestions) => {
                        const verdict = error || surveyQuestions;
                        reply(verdict);
                    });
                }
            }
        },
        {
            method: 'POST',
            path: '/end-quiz',
            config: {
                validate: {
                    payload: {
                        id: Joi.number().required(),
                        isSurvey: Joi.boolean().required()
                    }
                }
            },
            handler: (request, reply) => {
                const { id, isSurvey } = request.payload;
                setQuizOrSurveyToPresented(pool, id, isSurvey, (error, result) => {

                    const verdict = error || result;
                    reply(verdict);
                });
            }
        },
        {
            method: 'GET',
            path: '/get-quiz-result',
            handler: (request, reply) => {
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    /* istanbul ignore if */
                    if (error) { return reply(error); }

                    const { module_id, quiz_id } = request.query;
                    const { user_id } = decoded.user_details;

                    calculateQuizScore(pool, user_id, quiz_id, (error, score) => {
                        /* istanbul ignore if */
                        if (error) {
                            console.error(error);
                            return reply(error);
                        }
                        setQuizScore(pool, user_id, quiz_id, score.raw, (error) => {
                            /* istanbul ignore if */
                            if (error) {
                                console.error(error);
                                return reply(error);
                            }
                            getNewTrophyState(pool, user_id, module_id, quiz_id, score.percentage, (error, newTrophyState) => {
                                /* istanbul ignore if */
                                if (error) {
                                    console.error(error);
                                    return reply(error);
                                }

                                setNewTrophyState(pool, user_id, module_id, newTrophyState, (error) => {


                                    const verdict = error || { newTrophyState: newTrophyState, score: score };
                                    console.log(verdict, '<<>><<><>><<>');
                                    reply(verdict);
                                });
                            });
                        });
                    });
                });
            }
        },
        {
            method: 'GET',
            path: '/get-review',
            config: {
                validate: {
                    query: {
                        id: Joi.string().required(),
                        isSurvey: Joi.boolean().required()
                    }
                }
            },
            handler: (request, reply) => {
                const { id, isSurvey } = request.query;
                const parsed_id = parseInt(id, 10);
                getReview(pool, parsed_id, isSurvey, (error, module) => {
                    const verdict = error || module;
                    reply(verdict);
                });
            }
        },
        {
            method: 'GET',
            path: '/get-quiz-members',
            config: {
                validate: {
                    query: {
                        id: Joi.string().required(),
                        isSurvey: Joi.boolean().required()
                    }
                }
            },
            handler: (request, reply) => {
                const { id, isSurvey } = request.query;

                const parsed_isSurvey = isSurvey === "true";
                const parsed_id = parseInt(id, 10);
                getQuizMembers(pool, parsed_id, parsed_isSurvey, (error, users) => {
                    const verdict = error || users;
                    reply(verdict);
                });

            }
        },
        {
            method: 'GET',
            path: '/edit-score',
            config: {
                validate: {
                    query: {
                        quiz_id: Joi.string().required(),
                        score: Joi.string().required(),
                        user_id: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {

                const { quiz_id, score, user_id } = request.query;
                const parsed_quiz_id = parseInt(quiz_id, 10);
                const parsed_user_id = parseInt(user_id, 10);
                const parsed_score = parseInt(score, 10);
                editScore(pool, parsed_user_id, parsed_quiz_id, parsed_score, (error, response) => {
                    const verdict = error || response;
                    reply(verdict);
                });
            }
        },
        {
            method: 'GET',
            path: '/get-quiz-details',
            config: {
                validate: {
                    query: Joi.alternatives().try(
                        Joi.object().keys({ quiz_id: Joi.string().required() }),
                        Joi.object().keys({ survey_id: Joi.string().required() })
                    )
                }
            },
            handler: (request, reply) => {
                const { quiz_id, survey_id } = request.query;
                if (quiz_id !== undefined) {
                    const parsed_quiz_id = parseInt(quiz_id, 10);
                    getQuizDetails(pool, parsed_quiz_id, (error, quizDetails) => {
                        const verdict = error || quizDetails;
                        reply(verdict);
                    });
                } else {
                    const parsed_survey_id = parseInt(survey_id, 10);
                    getSurveyDetails(pool, parsed_survey_id, (error, surveyDetails) => {
                        const verdict = error || surveyDetails;
                        reply(verdict);
                    });
                }
            }
        },
        {
            method: 'POST',
            path: '/update-quiz',
            config: {
                validate: {
                    payload: {
                        module_id: Joi.string().required(),
                        quiz_id: Joi.number(),
                        survey_id: Joi.number(),
                        name: Joi.string().required(),
                        editedQuestions: Joi.array(),
                        newQuestions: Joi.array(),
                        deletedQuestions: Joi.array(),
                        is_last_quiz: Joi.boolean()
                    }
                }
            },
            handler: (request, reply) => {
                const {
                  module_id, quiz_id, survey_id, name, editedQuestions, newQuestions, deletedQuestions, is_last_quiz
                } = request.payload;
                const isSurvey = Boolean(survey_id);
                const quizIdOrSurveyId = survey_id || quiz_id;
                // update quiz name
                updateQuizOrSurvey(pool, module_id, quiz_id, survey_id, name, is_last_quiz, (error) => {
                    /* istanbul ignore if */
                    if (error) {
                        return reply(error);
                    }

                    if (is_last_quiz) {
                        updateIsLastQuiz(pool, module_id, quizIdOrSurveyId, (error) => {
                            /* istanbul ignore if */
                            if (error) {
                                console.error(error);
                                return reply(error);
                            }
                        });
                    }

                    updateQuestions(pool, editedQuestions, (error) => {
                        /* istanbul ignore if */
                        if (error) {
                            return reply(error);
                        } else if (newQuestions.length !== 0) {
                            saveQuestions(pool, quizIdOrSurveyId, newQuestions, { isSurvey }, (error) => {
                                /* istanbul ignore if */
                                if (error) {
                                    return reply(error);
                                } else if (deletedQuestions.length !== 0) {
                                    deleteQuestions(pool, deletedQuestions, (error) => {
                                        /* istanbul ignore if */
                                        if (error) {
                                            return reply(error);
                                        }
                                        return reply('deleted Questions Worked: made it to the end');
                                    });
                                } else {
                                    return reply(' Saved Edited Questions: made it to the end');
                                }
                            });
                        } else {
                            if (deletedQuestions.length !== 0) {
                                deleteQuestions(pool, deletedQuestions, (error) => {
                                    /* istanbul ignore if */
                                    if (error) {
                                        return reply(error);
                                    }
                                    return reply('deleted Questions when deletedQuestions.length !== 0: made it to the end');
                                });
                            }
                            return reply(true);
                        }
                    });
                });
            }
        },
        {
            method: 'GET',
            path: '/abort-quiz',
            config: {
                validate: {
                    query: {
                        quiz_id: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {
                const { quiz_id } = request.query;
                const parsed_quiz_id = parseInt(quiz_id, 10);

                deleteResponses(pool, parsed_quiz_id, (error, result) => {

                    const verdict = error || result;
                    reply(verdict);
                });
            }
        },
        {
            method: 'GET',
            path: '/get-quiz-details-student',
            config: {
                validate: {
                    query: {
                        quiz_id: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    /* istanbul ignore if */
                    if (error) { return reply(error); }

                    const { quiz_id } = request.query;
                    const { user_id } = decoded.user_details;

                    const parsed_quiz_id = parseInt(quiz_id, 10);
                    getQuizDetailsStudent(pool, parsed_quiz_id, user_id, (error, quizDetails) => {
                        const verdict = error || quizDetails;
                        reply(verdict);
                    });
                });
            }
        }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'quizes' } };
