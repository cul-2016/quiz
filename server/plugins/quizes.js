const saveStudentResponse = require('../lib/saveStudentResponse');
const updateIsLastQuiz = require('../lib/updateIsLastQuiz.js');
const saveQuiz = require('../lib/saveQuiz.js');
const saveSurvey = require('../lib/saveSurvey');
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

exports.register = (server, options, next) => {
    const pool = server.app.pool;

    server.route([
        {
            method: 'POST',
            path: '/save-student-response',
            handler: (request, reply) => {
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    /* istanbul ignore if */
                    if (error) { return reply(error); }

                    //questions about the following
                    // unsure as to where we are getting the survey_id from
                    // response: studentResponse, payload already gives it to us as response.

                    const { user_id } = decoded.user_details;
                    let {
                        quiz_id = null, survey_id = null, question_id, response: studentResponse
                    } = request.payload;

                    const checkExists = el => el !== undefined && el !== null;

                    if (
                        [user_id, question_id, studentResponse].every(checkExists) &&
                        [quiz_id, survey_id].some(checkExists)
                    ) {
                        quiz_id = quiz_id && parseInt(quiz_id);
                        survey_id = survey_id && parseInt(survey_id);

                        question_id = parseInt(question_id);
                        saveStudentResponse(pool, user_id, quiz_id, survey_id, question_id, studentResponse, (error, response) => {
                            /* istanbul ignore if */
                            if (error) {
                                console.error(error);
                            }
                            var verdict = error || response;
                            reply(verdict);
                        });
                    } else {
                        reply(new Error('one of the required querystrings is not defined'));
                    }
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
            handler: (request, reply) => {
                const { quiz_id } = request.query;

                if (quiz_id !== undefined) {

                    const parsed_quiz_id = parseInt(quiz_id, 10);
                    getQuizQuestions(pool, parsed_quiz_id, (error, questions) => {

                        const verdict = error || questions;
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
            handler: (request, reply) => {
                const { quiz_id } = request.query;

                if (quiz_id !== undefined) {

                    const parsed_quiz_id = parseInt(quiz_id, 10);
                    getQuizReview(pool, parsed_quiz_id, (error, module) => {

                        const verdict = error || module;
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
                const { quiz_id } = request.query;

                if (quiz_id !== undefined) {

                    const parsed_quiz_id = parseInt(quiz_id, 10);
                    getQuizMembers(pool, parsed_quiz_id, (error, users) => {
                        const verdict = error || users;
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
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    /* istanbul ignore if */
                    if (error) { return reply(error); }

                    const { quiz_id, score } = request.query;
                    const { user_id } = decoded.user_details;
                    if (quiz_id !== undefined && score !== undefined) {
                        const parsed_quiz_id = parseInt(quiz_id, 10);
                        const parsed_score = parseInt(quiz_id, 10);
                        editScore(pool, user_id, parsed_quiz_id, parsed_score, (error, response) => {
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
            handler: (request, reply) => {
                const { quiz_id } = request.query;
                if (quiz_id !== undefined) {

                    const parsed_quiz_id = parseInt(quiz_id, 10);
                    getQuizDetails(pool, parsed_quiz_id, (error, quizDetails) => {
                        const verdict = error || quizDetails;
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
                const {
                  module_id, quiz_id, survey_id, name, editedQuestions, newQuestions, deletedQuestions, is_last_quiz
                } = request.payload;
                const isSurvey = Boolean(survey_id);
                const quizIdOrSurveyId = survey_id || quiz_id;

                // update quiz name
                updateQuiz(pool, module_id, quizIdOrSurveyId, name, is_last_quiz, (error) => {
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
            handler: (request, reply) => {

                const { quiz_id } = request.query;

                if (quiz_id !== undefined) {
                    const parsed_quiz_id = parseInt(quiz_id, 10);

                    deleteResponses(pool, parsed_quiz_id, (error, result) => {

                        const verdict = error || result;
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
                jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {
                    /* istanbul ignore if */
                    if (error) { return reply(error); }

                    const { quiz_id } = request.query;
                    const { user_id } = decoded.user_details;

                    if (quiz_id !== undefined) {

                        const parsed_quiz_id = parseInt(quiz_id, 10);
                        getQuizDetailsStudent(pool, parsed_quiz_id, user_id, (error, quizDetails) => {
                            const verdict = error || quizDetails;
                            reply(verdict);
                        });
                    } else {
                        reply(new Error('quiz_id is not defined'));
                    }
                });
            }
        }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'quizes' } };
