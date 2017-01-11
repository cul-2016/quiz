import request from '../lib/request.js';

export const GET_QUIZ_REVIEW_REQUEST = 'GET_QUIZ_REVIEW_REQUEST';
export const GET_QUIZ_REVIEW_SUCCESS = 'GET_QUIZ_REVIEW_SUCCESS';
export const GET_QUIZ_REVIEW_FAILURE = 'GET_QUIZ_REVIEW_FAILURE';

export const FLIP_IS_ANSWER_SHOWING = 'FLIP_IS_ANSWER_SHOWING';

export const INCREMENT_CURRENT_QUIZ_INDEX = 'INCREMENT_CURRENT_QUIZ_INDEX';

export const CLEAR_REVIEW_STATE = 'CLEAR_REVIEW_STATE';

export const GO_BACK = 'GO_BACK';
export const SHOW_ANSWER = 'SHOW_ANSWER';

export const getQuizReview = (quiz_id) => (dispatch) => {

    dispatch(getQuizReviewRequest());

    request.get(dispatch)(`/get-quiz-review?quiz_id=${quiz_id}`)
        .then((response) => {
            dispatch(getQuizReviewSuccess(response.data));
        })
        .catch((error) => {
            dispatch(getQuizReviewFailure(error));
        });
};


export const getQuizReviewRequest = () => ({
    type: GET_QUIZ_REVIEW_REQUEST
});

export const getQuizReviewSuccess = (questions) => ({
    type: GET_QUIZ_REVIEW_SUCCESS,
    questions
});

export const getQuizReviewFailure = (error) => ({
    type: GET_QUIZ_REVIEW_FAILURE,
    error
});

export const flipIsAnswerShowing = () => ({
    type: FLIP_IS_ANSWER_SHOWING
});

export const incrementCurrentQuizIndex = () => ({
    type: INCREMENT_CURRENT_QUIZ_INDEX
});

export const clearReviewState = () => ({
    type: CLEAR_REVIEW_STATE
});

export const goBack = () => ({
    type: GO_BACK
});

export const showAnswer = idx => ({
    type: SHOW_ANSWER,
    idx
});

export const getQuizDetailsStudent = (quiz_id) => dispatch => {

    dispatch(getQuizReviewRequest());

    request.get(dispatch)(`/get-quiz-details-student?quiz_id=${quiz_id}`)
    .then((response) => {
        dispatch(getQuizReviewSuccess(response.data));
    }).catch((error) => {
        dispatch(getQuizReviewFailure(error));
    });
};
