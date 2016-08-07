import axios from 'axios';
import { hashHistory } from 'react-router';
import { setUserDetails } from './user';

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

export const AUTHENTICATE_USER_REQUEST = 'AUTHENTICATE_USER_REQUEST';
export const AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS';
export const AUTHENTICATE_USER_FAILURE = 'AUTHENTICATE_USER_FAILURE';


export const updateEmail = (value) => ({
    type: UPDATE_EMAIL,
    value
});

export const updatePassword = (value) => ({
    type: UPDATE_PASSWORD,
    value
});

// -----
// AUTHENTICATE USER
// -----

export function authenticateUser (email, password) {

    return (dispatch) => {

        dispatch(authenticateUserRequest());

        const payload = {
            email,
            password
        };

        axios.post('/authenticate-user', payload)
            .then((response) => {
                if (response.data === false) {
                    dispatch(authenticateUserSuccess(false));
                } else {
                    dispatch(setUserDetails(response.data));
                    dispatch(authenticateUserSuccess(true));
                    if (response.data.is_lecturer) {
                        hashHistory.push('/dashboard');
                    } else {
                        hashHistory.push('/dashboard-student');
                    }
                }
            })
            .catch((error) => {
                dispatch(authenticateUserFailure(error));
            });
    };
}

export const authenticateUserRequest = () => ({
    type: AUTHENTICATE_USER_REQUEST
});

export const authenticateUserSuccess = (data) => ({
    type: AUTHENTICATE_USER_SUCCESS,
    data
});

export const authenticateUserFailure = (error) => ({
    type: AUTHENTICATE_USER_FAILURE,
    error
});
