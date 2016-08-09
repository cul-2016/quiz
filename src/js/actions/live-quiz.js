import axios from 'axios'; // eslint-disable-line

export const SET_QUIZ_ID = 'SET_QUIZ_ID';
export const START_QUIZ = 'START_QUIZ';
export const END_QUIZ = 'END_QUIZ';

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
