import update from 'react-addons-update';
import * as actionsTypes from '../actions/new-quiz';

const initialState = {
    name: undefined,
    questions: [],
    isSavingQuiz: false,
    error: undefined
};

export default function (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.ADD_QUESTION:
        return handleAddQuestion(state, action);

    case actionsTypes.UPDATE_VALUE:
        return handleUpdateValue(state, action);

    case actionsTypes.UPDATE_QUIZ_NAME:
        return handleUpdateQuizName(state, action);

    default:
        return state;
    }

}

export const handleAddQuestion = (state, action) => { //eslint-disable-line no-unused-vars
    const newQuestions = {
        question: undefined,
        A: undefined,
        B: undefined,
        C: undefined,
        D: undefined,
        correct_answer: undefined
    };
    return update(state, {
        questions: { $push: [newQuestions] }
    });
};

export const handleUpdateValue = (state, action) => {

    const newObj = Object.assign({}, state.questions[action.index], { [action.inputType]: action.value });
    return update(state, {
        questions: { $splice: [[action.index, 1, newObj]] }
    });
};

export const handleUpdateQuizName = (state, action) => {

    return update(state, {
        name: { $set: action.value }
    });
};
