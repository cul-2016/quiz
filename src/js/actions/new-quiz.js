import axios from 'axios';

export const ADD_QUESTION = 'ADD_QUESTION';
export const UPDATE_VALUE = 'UPDATE_VALUE';
export const UPDATE_QUIZ_NAME = 'UPDATE_QUIZ_NAME';

export const SAVE_QUIZ_REQUEST = 'SAVE_QUIZ_REQUEST';
export const SAVE_QUIZ_SUCCESS = 'SAVE_QUIZ_SUCCESS';
export const SAVE_QUIZ_FAILURE = 'SAVE_QUIZ_FAILURE';

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

export function saveQuiz (module_id, quizName, questions) {

    return (dispatch) => {

        dispatch(saveQuizRequest());

        const payload = {
            module_id,
            quizName,
            questions
        };
        axios.post('/save-quiz', payload)
            .then((response) => {

                //what should be returned.
                dispatch(saveQuizSuccess(response));

            }, (error) => {
                console.error(error, 'error from axios /save-quiz');
            })
            .catch((error) => {
                dispatch(saveQuizFailure(error));
            });
    };
}

export const saveQuizRequest = () => ({
    type: SAVE_QUIZ_REQUEST
});

export const saveQuizSuccess = (data) => ({
    type: SAVE_QUIZ_SUCCESS,
    data
});

export const saveQuizFailure = (error) => ({
    type: SAVE_QUIZ_FAILURE,
    error
});
