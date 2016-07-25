// import axios from 'axios';

export const ADD_QUESTION = 'ADD_QUESTION';
export const UPDATE_VALUE = 'UPDATE_VALUE';

export const addQuestion = () => ({
    type: ADD_QUESTION
});

export const updateValue = (inputType, value, index) => ({
    type: UPDATE_VALUE,
    inputType,
    value,
    index
});
