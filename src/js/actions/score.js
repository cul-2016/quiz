import axios from 'axios';

export const GET_QUIZ_SCORE_REQUEST = 'GET_QUIZ_SCORE_REQUEST';
export const GET_QUIZ_SCORE_SUCCESS = 'GET_QUIZ_SCORE_SUCCESS';
export const GET_QUIZ_SCORE_FAILURE = 'GET_QUIZ_SCORE_FAILURE';


export function getQuizScore (user_id, quiz_id) {

    return (dispatch) => {

        dispatch(getQuizScoreRequest());

        axios.get(`/get-quiz-score?user_id=${user_id}&quiz_id=${quiz_id}`)
            .then((response) => {
                dispatch(getQuizScoreSuccess(response.data));
            })
            .catch((error) => {
                dispatch(getQuizScoreFailure(error));
            });
    };
}

export const getQuizScoreRequest = () => ({
    type: GET_QUIZ_SCORE_REQUEST
});

export const getQuizScoreSuccess = (score) => ({
    type: GET_QUIZ_SCORE_SUCCESS,
    score
});

export const getQuizScoreFailure = (error) => ({
    type: GET_QUIZ_SCORE_FAILURE,
    error
});
