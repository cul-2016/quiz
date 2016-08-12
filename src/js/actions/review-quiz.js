import axios from 'axios';

export const GET_QUIZ_REVIEW_REQUEST = 'GET_QUIZ_REVIEW_REQUEST';
export const GET_QUIZ_REVIEW_SUCCESS = 'GET_QUIZ_REVIEW_SUCCESS';
export const GET_QUIZ_REVIEW_FAILURE = 'GET_QUIZ_REVIEW_FAILURE';

export function getQuizReview (quiz_id) {

    return (dispatch) => {

        dispatch(getQuizReviewRequest());

        axios.get(`/get-quiz-review?quiz_id=${quiz_id}`)
            .then((response) => {
                dispatch(getQuizReviewSuccess(response.data));
            })
            .catch((error) => {
                dispatch(getQuizReviewFailure(error));
            });
    };
}


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
