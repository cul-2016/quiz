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

exports.register = (server, options, next) => {
    const pool = server.app.pool;
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
                    saveStudentResponse(pool, user_id, quiz_id, question_id, response, (error, response) => {
                        var verdict = error || response;
                        reply(verdict);
                    });
                } else {
                    reply(new Error('one of the required querystrings is not defined'));
                }
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
                        var mappedQuestions = questions.map((question) => {
                            question.quiz_id = quiz_id;
                            return question;
                        });
                        saveQuestions(pool, mappedQuestions, (error, response) => {
                            /* istanbul ignore if */
                            if (error) {
                                console.error(error);
                            }
                            var verdict = error || response;
                            return reply(verdict);
                        });
                    }
                });
            }
        },
        {
            method: 'GET',
            path: '/get-quiz-questions',
            handler: (request, reply) => {
                var quiz_id = request.query.quiz_id;
                if (quiz_id !== undefined) {

                    quiz_id = parseInt(quiz_id, 10);
                    getQuizQuestions(pool, quiz_id, (error, questions) => {

                        var verdict = error || questions;
                        reply(verdict);
                    });
                } else {
                    reply(new Error('quiz_id is not defined'));
                }
            }
        },
        {
            method: 'POST',
            path: '/end-quiz',
            handler: (request, reply) => {

                var quiz_id = request.payload.quiz_id;

                setQuizToPresented(pool, quiz_id, (error, result) => {

                    var verdict = error || result;
                    reply(verdict);
                });
            }
        },
        {
            method: 'GET',
            path: '/get-quiz-result',
            handler: (request, reply) => {

                var user_id = request.query.user_id;
                var module_id = request.query.module_id;
                var quiz_id = request.query.quiz_id;

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

                                    var verdict = error || { newTrophyState: newTrophyState, score: score };

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
            path: '/get-quiz-review',
            handler: (request, reply) => {
                var quiz_id = request.query.quiz_id;
                if (quiz_id !== undefined) {

                    quiz_id = parseInt(quiz_id, 10);
                    getQuizReview(pool, quiz_id, (error, module) => {

                        var verdict = error || module;
                        reply(verdict);
                    });
                } else {
                    reply(new Error('quiz_id is not defined'));
                }
            }
        },
        {
            method: 'GET',
            path: '/get-quiz-members',
            handler: (request, reply) => {
                var quiz_id = request.query.quiz_id;
                if (quiz_id !== undefined) {

                    quiz_id = parseInt(quiz_id, 10);
                    getQuizMembers(pool, quiz_id, (error, users) => {
                        var verdict = error || users;
                        reply(verdict);
                    });
                } else {
                    reply(new Error('quiz_id is not defined'));
                }
            }
        },
        {
            method: 'GET',
            path: '/edit-score',
            handler: (request, reply) => {

                var user_id = request.query.user_id;
                var quiz_id = request.query.quiz_id;
                var score = request.query.score;

                if (quiz_id !== undefined && user_id !== undefined && score !== undefined) {

                    editScore(pool, user_id, quiz_id, score, (error, response) => {

                        var verdict = error || response;
                        reply(verdict);
                    });
                } else {
                    reply(new Error('quiz_id || user_id || score is not defined'));
                }
            }
        },
        {
            method: 'GET',
            path: '/get-quiz-details',
            handler: (request, reply) => {
                var quiz_id = request.query.quiz_id;
                if (quiz_id !== undefined) {

                    quiz_id = parseInt(quiz_id, 10);
                    getQuizDetails(pool, quiz_id, (error, quizDetails) => {
                        var verdict = error || quizDetails;
                        reply(verdict);
                    });
                } else {
                    reply(new Error('quiz_id is not defined'));
                }
            }
        },
        {
            method: 'POST',
            path: '/update-quiz',
            handler: (request, reply) => {
                var module_id = request.payload.module_id;
                var quiz_id = request.payload.quiz_id;
                var quizName = request.payload.quizName;
                var editedQuestions = request.payload.editedQuestions;
                var newQuestions = request.payload.newQuestions;
                var deletedQuestions = request.payload.deletedQuestions;
                var is_last_quiz = request.payload.is_last_quiz === true;

                // update quiz name
                updateQuiz(pool, module_id, quiz_id, quizName, is_last_quiz, (error) => {

                    if (is_last_quiz) {
                        updateIsLastQuiz(pool, module_id, quiz_id, (error) => {
                            /* istanbul ignore if */
                            if (error) {
                                console.error(error);
                                return reply(error);
                            }
                        });
                    }
                    /* istanbul ignore if */
                    if (error) {
                        return reply(error);
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
            handler: (request, reply) => {

                var quiz_id = request.query.quiz_id;

                if (quiz_id !== undefined) {
                    quiz_id = parseInt(quiz_id);

                    deleteResponses(pool, quiz_id, (error, result) => {

                        var verdict = error || result;
                        reply(verdict);
                    });
                } else {
                    reply(new Error('quiz_id is not defined'));
                }
            }
        },
        {
            method: 'GET',
            path: '/get-quiz-details-student',
            handler: (request, reply) => {

                let { query: { quiz_id, user_id } } = request;

                if ([quiz_id, user_id].indexOf(undefined) === -1) {

                    quiz_id = parseInt(quiz_id, 10);
                    getQuizDetailsStudent(pool, quiz_id, user_id, (error, quizDetails) => {
                        var verdict = error || quizDetails;
                        reply(verdict);
                    });
                } else {
                    reply(new Error('quiz_id is not defined'));
                }
            }
        }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'quizes' } };
