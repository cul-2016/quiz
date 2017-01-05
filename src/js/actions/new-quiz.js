import axios from 'axios';

export const ADD_QUESTION = 'ADD_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const UPDATE_VALUE = 'UPDATE_VALUE';
export const UPDATE_QUIZ_NAME = 'UPDATE_QUIZ_NAME';
export const CLEAR_NEW_QUIZ_STATE = 'CLEAR_NEW_QUIZ_STATE';
export const TOGGLE_IS_LAST_QUIZ = 'TOGGLE_IS_LAST_QUIZ';
export const TOGGLE_IS_SURVEY = 'TOGGLE_IS_SURVEY';

export const SAVE_QUIZ_REQUEST = 'SAVE_QUIZ_REQUEST';
export const SAVE_QUIZ_SUCCESS = 'SAVE_QUIZ_SUCCESS';
export const SAVE_QUIZ_FAILURE = 'SAVE_QUIZ_FAILURE';

export const UPDATE_QUIZ_REQUEST = 'UPDATE_QUIZ_REQUEST';
export const UPDATE_QUIZ_SUCCESS = 'UPDATE_QUIZ_SUCCESS';
export const UPDATE_QUIZ_FAILURE = 'UPDATE_QUIZ_FAILURE';

export const GET_QUIZ_DETAILS_REQUEST = 'GET_QUIZ_DETAILS_REQUEST';
export const GET_QUIZ_DETAILS_SUCCESS = 'GET_QUIZ_DETAILS_SUCCESS';
export const GET_QUIZ_DETAILS_FAILURE = 'GET_QUIZ_DETAILS_FAILURE';



export const addQuestion = () => ({
    type: ADD_QUESTION
});

export const deleteQuestion = (index) => ({
    type: DELETE_QUESTION,
    index
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

export const clearNewQuizState = () => ({
    type: CLEAR_NEW_QUIZ_STATE
});

export const toggleIsLastQuiz = () => ({
    type: TOGGLE_IS_LAST_QUIZ
});

export const toggleIsSurvey = (e) => ({
    type: TOGGLE_IS_SURVEY,
    isSurvey: e.target.checked
});


//
// SAVE QUIZ ACTIONS
//

export const saveQuiz = (
    module_id, name, questions, is_last_quiz, isSurvey
) => dispatch => {

    dispatch(saveQuizRequest());

    const payload = {
        module_id,
        name,
        questions,
        is_last_quiz,
        isSurvey
    };

    axios.post('/save-quiz', payload)
    .then((response) => {
        dispatch(saveQuizSuccess(response));
    }).catch((error) => {
        dispatch(saveQuizFailure(error));
    });
};

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

//
// UPDATE QUIZ ACTIONS
//

export function updateQuiz (module_id, quiz_id, quizName, questions, deletedQuestions, is_last_quiz) {

    var editedQuestions = questions.filter((question) => {
        if (question.question_id) {
            return question;
        }
    }).map((question) => {
        question["quiz_id"] = quiz_id;
        return question;
    });

    var newQuestions = questions.filter((question) => {
        if (!question.question_id) {
            return question;
        }
    }).map((question) => {
        question["quiz_id"] = quiz_id;
        return question;
    });

    return (dispatch) => {

        dispatch(updateQuizRequest());

        const payload = {
            module_id,
            quiz_id,
            quizName,
            editedQuestions,
            newQuestions,
            deletedQuestions,
            is_last_quiz
        };
        axios.post('/update-quiz', payload)
            .then(() => {

                dispatch(updateQuizSuccess());

            }, (error) => {
                console.error(error, 'error from axios /update-quiz');
            })
            .catch((error) => {
                dispatch(updateQuizFailure(error));
            });
    };
}

export const updateQuizRequest = () => ({
    type: UPDATE_QUIZ_REQUEST
});

export const updateQuizSuccess = () => ({
    type: UPDATE_QUIZ_SUCCESS
});

export const updateQuizFailure = (error) => ({
    type: UPDATE_QUIZ_FAILURE,
    error
});

//
// GET QUIZ DETAILS ACTIONS
//

export function getQuizDetails (quiz_id) {

    return (dispatch) => {

        dispatch(getQuizDetailsRequest());

        axios.get(`/get-quiz-details?quiz_id=${quiz_id}`)
            .then((response) => {
                dispatch(getQuizDetailsSuccess(response.data));

            }, (error) => {
                console.error(error, 'error from axios /get-quiz-questions');
            })
            .catch((error) => {
                dispatch(getQuizDetailsFailure(error));
            });
    };
}

export const getQuizDetailsRequest = () => ({
    type: GET_QUIZ_DETAILS_REQUEST
});

export const getQuizDetailsSuccess = (data) => ({
    type: GET_QUIZ_DETAILS_SUCCESS,
    data
});

export const getQuizDetailsFailure = (error) => ({
    type: GET_QUIZ_DETAILS_FAILURE,
    error
});
