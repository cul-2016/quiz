import axios from 'axios';

export const SET_USER_DETAILS = 'SET_USER_DETAILS';

export const TOGGLE_COOKIE_MESSAGE = 'TOGGLE_COOKIE_MESSAGE';

export const CLEAR_ERROR = 'CLEAR_ERROR';

export const GET_USER_DETAILS_REQUEST = 'GET_USER_DETAILS_REQUEST';
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const GET_USER_DETAILS_FAILURE = 'GET_USER_DETAILS_FAILURE';


export const setUserDetails = (data) => ({
    type: SET_USER_DETAILS,
    data
});

export const toggleCookieMessage = () => ({
    type: TOGGLE_COOKIE_MESSAGE
});

export const clearErrorFromState = (reducerState) => ({
    type: CLEAR_ERROR,
    reducerState
});


// -----
// GET_USER_DETAILS
// -----

export function getUserDetails (user_id) {

    return (dispatch) => {

        dispatch(getUserDetailsRequest());

        if (user_id) {
            axios.get(`/get-user-details?user_id=${user_id}`)
            .then((response) => {
                dispatch(getUserDetailsSuccess(response.data));
            })
            .catch((error) => {
                dispatch(getUserDetailsFailure(error));
            });
        }
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
