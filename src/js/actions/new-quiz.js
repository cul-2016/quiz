// import axios from 'axios';

export const ADD_QUESTION = 'ADD_QUESTION';
export const UPDATE_VALUE = 'UPDATE_VALUE';
export const UPDATE_QUIZ_NAME = 'UPDATE_QUIZ_NAME';

export const addQuestion = () => ({
    type: ADD_QUESTION
});

export const updateValue = (inputType, value, index) => ({
    type: UPDATE_VALUE,
    inputType,
    value,
    index
});

export const updateQuizName = (value) => ({
    type: UPDATE_QUIZ_NAME,
    value
});
