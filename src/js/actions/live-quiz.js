import axios from 'axios'; // eslint-disable-line

export const SET_QUIZ_ID = 'SET_QUIZ_ID';
export const START_QUIZ = 'START_QUIZ';
export const END_QUIZ = 'END_QUIZ';
export const GO_TO_NEXT_QUESTION = 'GO_TO_NEXT_QUESTION';
export const GO_TO_PREVIOUS_QUESTION = 'GO_TO_PREVIOUS_QUESTION';
export const SET_INTERVAL_ID = 'SET_INTERVAL_ID';
export const SET_NEXT_QUESTION = 'SET_NEXT_QUESTION';


export const setQuizID = (quiz_id) => ({
    type: SET_QUIZ_ID,
    quiz_id
});

export const startQuiz = () => ({
    type: START_QUIZ
});

export const endQuiz = () => ({
    type: END_QUIZ
});

export const goToNextQuestion = () => ({
    type: GO_TO_NEXT_QUESTION
});

export const goToPreviousQuestion = () => ({
    type: GO_TO_PREVIOUS_QUESTION
});

export const setIntervalID = (interval_id) => ({
    type: SET_INTERVAL_ID,
    interval_id
});

export const setNextQuestion = (nextQuestion) => ({
    type: SET_NEXT_QUESTION,
    nextQuestion
});
