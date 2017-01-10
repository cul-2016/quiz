import axios from 'axios';
import { hashHistory } from 'react-router';
import { logout } from './login.js';
export const GET_QUIZ_RESULT_REQUEST = 'GET_QUIZ_RESULT_REQUEST';
export const GET_QUIZ_RESULT_SUCCESS = 'GET_QUIZ_RESULT_SUCCESS';
export const GET_QUIZ_RESULT_FAILURE = 'GET_QUIZ_RESULT_FAILURE';


export function getQuizResult (user_id, module_id, quiz_id) {

    return (dispatch) => {

        dispatch(getQuizResultRequest());

        axios.get(`/get-quiz-result?module_id=${module_id}&quiz_id=${quiz_id}`)
            .then((response) => {
                dispatch(getQuizResultSuccess(response.data));
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    dispatch(logout());
                    hashHistory.push('/');
                }
                dispatch(getQuizResultFailure(error));
            });
    };
}

export const getQuizResultRequest = () => ({
    type: GET_QUIZ_RESULT_REQUEST
});

export const getQuizResultSuccess = (data) => ({
    type: GET_QUIZ_RESULT_SUCCESS,
    data
});

export const getQuizResultFailure = (error) => ({
    type: GET_QUIZ_RESULT_FAILURE,
    error
});
