const saveStudentResponse = require('../lib/saveStudentResponse');
const updateIsLastQuiz = require('../lib/updateIsLastQuiz.js');
const saveQuiz = require('../lib/saveQuiz.js');
const saveQuestions = require('../lib/saveQuestions.js');
const getQuizQuestions = require('../lib/getQuizQuestions');
const setQuizToPresented = require('../lib/setQuizToPresented.js');
const calculateQuizScore = require('../lib/calculateQuizScore.js');
const getIsLastQuiz = require('../lib/getIsLastQuiz.js');
const setQuizScore = require('../lib/setQuizScore.js');
const getNewTrophyState = require('../lib/getNewTrophyState.js');
const setNewTrophyState = require('../lib/setNewTrophyState.js');
const getQuizReview = require('../lib/getQuizReview.js');
const getQuizMembers = require('../lib/getQuizMembers.js');
const updateQuiz = require('../lib/updateQuiz.js');
const updateQuestions = require('../lib/updateQuestions.js');
const deleteQuestions = require('../lib/deleteQuestions.js');
const deleteResponses = require('../lib/deleteResponses.js');
const getQuizDetails = require('../lib/getQuizDetails.js');
const editScore = require('../lib/editScore.js');
const getQuizDetailsStudent = require('../lib/getQuizDetailsStudent');

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
                        quiz_id: Joi.string().required(),
                        question_id: Joi.string().required(),
                        response: Joi.string().required(),
                        user_id: Joi.string()
                    }
                }
            },
            handler: (request, reply) => {
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    /* istanbul ignore if */
                    if (error) { return reply(error); }

                    const { quiz_id, question_id, response } = request.payload;
                    const { user_id } = decoded.user_details;

                    const parsed_user_id = parseInt(user_id);
                    const parsed_quiz_id = parseInt(quiz_id);
                    const parsed_question_id = parseInt(question_id);

                    saveStudentResponse(pool, parsed_user_id, parsed_quiz_id, parsed_question_id, response, (error, response) => {
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
                const { module_id, quizName, questions } = request.payload;
                const is_last_quiz = request.payload.is_last_quiz === true;
                saveQuiz(pool, module_id, quizName, is_last_quiz, (error, quiz_id) => {
                    /* istanbul ignore if */
                    if (error) {
                        console.error(error);
                        return reply(error);
                    }
                    if (questions.length === 0) {
                        if (is_last_quiz) {
                            updateIsLastQuiz(pool, module_id, quiz_id, (error) => {
                                /* istanbul ignore if */
                                if (error) {
                                    console.error(error);
                                    return reply(error);
                                }
                            });
                        }
                    } else {
                        const mappedQuestions = questions.map((question) => {
                            question.quiz_id = quiz_id;
                            return question;
                        });
                        saveQuestions(pool, mappedQuestions, (error, response) => {
                            /* istanbul ignore if */
                            if (error) {
                                console.error(error);
                            }
                            const verdict = error || response;
                            return reply(verdict);
                        });
                    }
                });
            }
        },
        {
            method: 'GET',
            path: '/get-quiz-questions',
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

                getQuizQuestions(pool, parsed_quiz_id, (error, questions) => {

                    const verdict = error || questions;
                    reply(verdict);
                });
            }
        },
        {
            method: 'POST',
            path: '/end-quiz',
            config: {
                validate: {
                    payload: {
                        quiz_id: Joi.number().required()
                    }
                }
            },
            handler: (request, reply) => {
                const { quiz_id } = request.payload;

                setQuizToPresented(pool, quiz_id, (error, result) => {

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

                    getIsLastQuiz(pool, quiz_id, (error, is_last_quiz) => {
                        /* istanbul ignore if */
                        if (error) {
                            console.error(error);
                            return reply(error);
                        }
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
                                getNewTrophyState(pool, user_id, module_id, quiz_id, score.percentage, is_last_quiz, (error, newTrophyState) => {
                                    /* istanbul ignore if */
                                    if (error) {
                                        console.error(error);
                                        return reply(error);
                                    }
                                    setNewTrophyState(pool, user_id, module_id, newTrophyState, (error) => {

                                        const verdict = error || { newTrophyState: newTrophyState, score: score };

                                        reply(verdict);
                                    });
                                });
                            });
                        });
                    });
                });
            }
        },
        {
            method: 'GET',
            path: '/get-quiz-review',
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
                
                getQuizReview(pool, parsed_quiz_id, (error, module) => {

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
                        quiz_id: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {
                const { quiz_id } = request.query;
                const parsed_quiz_id = parseInt(quiz_id, 10);

                getQuizMembers(pool, parsed_quiz_id, (error, users) => {
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
                        score: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    /* istanbul ignore if */
                    if (error) { return reply(error); }

                    const { quiz_id, score } = request.query;
                    const { user_id } = decoded.user_details;
                    if (quiz_id !== undefined && score !== undefined) {

                        editScore(pool, user_id, quiz_id, score, (error, response) => {
                            const verdict = error || response;
                            reply(verdict);
                        });
                    } else {
                        reply(new Error('quiz_id || user_id || score is not defined'));
                    }
                });
            }
        },
        {
            method: 'GET',
            path: '/get-quiz-details',
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

                getQuizDetails(pool, parsed_quiz_id, (error, quizDetails) => {
                    const verdict = error || quizDetails;
                    reply(verdict);
                });
            }
        },
        {
            method: 'POST',
            path: '/update-quiz',
            config: {
                validate: {
                    payload: {
                        module_id: Joi.string().required(),
                        quiz_id: Joi.number().required(),
                        quizName: Joi.string().required(),
                        editedQuestions: Joi.array().required(),
                        newQuestions: Joi.array().required(),
                        deletedQuestions: Joi.array().required(),
                        is_last_quiz: Joi.string()
                    }
                }
            },
            handler: (request, reply) => {
                const {
                  module_id,
                  quiz_id,
                  quizName,
                  editedQuestions,
                  newQuestions,
                  deletedQuestions
                } = request.payload;
                const is_last_quiz = request.payload.is_last_quiz === true;

                // update quiz name
                updateQuiz(pool, module_id, quiz_id, quizName, is_last_quiz, (error) => {
                    /* istanbul ignore if */
                    if (error) {
                        return reply(error);
                    }

                    if (is_last_quiz) {
                        updateIsLastQuiz(pool, module_id, quiz_id, (error) => {
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
                            saveQuestions(pool, newQuestions, (error) => {
                                /* istanbul ignore if */
                                if (error) {
                                    return reply(error);
                                } else if (deletedQuestions.length !== 0) {
                                    deleteQuestions(pool, deletedQuestions, (error) => {
                                        /* istanbul ignore if */
                                        if (error) {
                                            return reply(error);
                                        }
                                        return reply('made it to the end');
                                    });
                                } else {
                                    return reply('made it to the end');
                                }
                            });
                        } else {
                            if (deletedQuestions.length !== 0) {
                                deleteQuestions(pool, deletedQuestions, (error) => {
                                    /* istanbul ignore if */
                                    if (error) {
                                        return reply(error);
                                    }
                                    return reply('made it to the end');
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
