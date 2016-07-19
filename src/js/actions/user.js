import { hashHistory } from 'react-router';
import axios from 'axios';

export const SET_USER_DETAILS = 'SET_USER_DETAILS';

export const GET_USER_DETAILS_REQUEST = 'GET_USER_DETAILS_REQUEST';
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const GET_USER_DETAILS_FAILURE = 'GET_USER_DETAILS_FAILURE';


export const setUserDetails = (data) => ({
    type: SET_USER_DETAILS,
    data
});

// -----
// GET_USER_DETAILS
// -----

export function getUserDetails (user_id) {

    return (dispatch) => {

        dispatch(getUserDetailsRequest());

        axios.get(`/get-user-details?user_id=${user_id}`)
        .then((response) => {
            dispatch(getUserDetailsSuccess(response.data));
            if (response.data.is_lecturer) {
                hashHistory.push('/dashboard-lecturer');
            } else {
                hashHistory.push('/dashboard-student');
            }
        })
        .catch((error) => {
            dispatch(getUserDetailsFailure(error));
        });
    };
}


export const getUserDetailsRequest = () => ({
    type: GET_USER_DETAILS_REQUEST
});

export const getUserDetailsSuccess = (data) => ({
    type: GET_USER_DETAILS_SUCCESS,
    data
});

export const getUserDetailsFailure = (error) => ({
    type: GET_USER_DETAILS_FAILURE,
    error
});
