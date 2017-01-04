import update from 'react-addons-update';
import * as actionsTypes from '../actions/new-quiz';

const initialState = {
    name: undefined,
    questions: [],
    is_last_quiz: false,
    isSurvey: false,
    isSavingQuiz: false,
    isUpdatingQuiz: false,
    isFetchingQuizDetails: false,
    error: undefined,
    deletedQuestions: []
};

export default function (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.ADD_QUESTION:
        return handleAddQuestion(state, action);

    case actionsTypes.DELETE_QUESTION:
        return update(state, {
            questions: { $splice: [[action.index, 1]] },
            deletedQuestions: { $push: [state.questions[action.index].question_id] }
        });

    case actionsTypes.UPDATE_VALUE:
        return handleUpdateValue(state, action);

    case actionsTypes.UPDATE_QUIZ_NAME:
        return handleUpdateQuizName(state, action);

    case actionsTypes.CLEAR_NEW_QUIZ_STATE:
        return initialState;

    case actionsTypes.TOGGLE_IS_LAST_QUIZ:
        return update(state, {
            is_last_quiz: { $set: !state.is_last_quiz }
        });

    case actionsTypes.TOGGLE_IS_SURVEY:
        return update(state, {
            isSurvey: { $set: action.isSurvey }
        });

    case actionsTypes.SAVE_QUIZ_REQUEST:
        return update(state, {
            isSavingQuiz: { $set: true }
        });

    case actionsTypes.SAVE_QUIZ_SUCCESS:
        return update(state, {
            isSavingQuiz: { $set: false }
        });

    case actionsTypes.SAVE_QUIZ_FAILURE:
        return update(state, {
            isSavingQuiz: { $set: false },
            error: { $set: action.error }
        });

    case actionsTypes.UPDATE_QUIZ_REQUEST:
        return update(state, {
            isUpdatingQuiz: { $set: true }
        });

    case actionsTypes.UPDATE_QUIZ_SUCCESS:
        return update(state, {
            isUpdatingQuiz: { $set: false }
        });

    case actionsTypes.UPDATE_QUIZ_FAILURE:
        return update(state, {
            isUpdatingQuiz: { $set: false },
            error: { $set: action.error }
        });

    case actionsTypes.GET_QUIZ_DETAILS_REQUEST:
        return update(state, {
            isFetchingQuizDetails: { $set: true }
        });

    case actionsTypes.GET_QUIZ_DETAILS_SUCCESS:
        return update(state, {
            isFetchingQuizDetails: { $set: false },
            name: { $set: action.data.name },
            questions: { $set: action.data.questions },
            is_last_quiz: { $set: action.data.is_last_quiz }
        });

    case actionsTypes.GET_QUIZ_DETAILS_FAILURE:
        return update(state, {
            isFetchingQuizDetails: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;
    }

}

export const handleAddQuestion = (state, action) => { //eslint-disable-line no-unused-vars
    const newQuestions = {
        question: undefined,
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
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
