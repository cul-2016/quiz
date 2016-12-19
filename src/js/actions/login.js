import axios from 'axios';
import { hashHistory } from 'react-router';
import { setUserDetails } from './user';

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

export const AUTHENTICATE_USER_REQUEST = 'AUTHENTICATE_USER_REQUEST';
export const AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS';
export const AUTHENTICATE_USER_FAILURE = 'AUTHENTICATE_USER_FAILURE';

export const LOGOUT = 'LOGOUT';
export const INCORRECT_USER_DETAILS = 'INCORRECT_USER_DETAILS';


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
                console.log(response);
                if (response.data.message) {
                    dispatch(incorrectUserDetails(response.data.message));
                }
                else {
                    dispatch(authenticateUserSuccess(true));
                    dispatch(setUserDetails(response.data));
                    if (response.data.is_lecturer) {
                        hashHistory.push('/dashboard');
                    } else {
                        hashHistory.push('/dashboard');
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

export const logout = () => ({
    type: LOGOUT
});

export const incorrectUserDetails = (data) => ({
    type: INCORRECT_USER_DETAILS,
    data
});
