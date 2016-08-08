import axios from 'axios'; // eslint-disable-line

export const SET_QUIZ_ID = 'SET_QUIZ_ID';

export const setQuizID = (quiz_id) => ({
    type: SET_QUIZ_ID,
    quiz_id
});
