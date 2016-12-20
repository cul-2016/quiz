import axios from 'axios';
import { hashHistory } from 'react-router';

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_CONFIRMED_PASSWORD = 'UPDATE_CONFIRMED_PASSWORD';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';


const basicUpdate = (type) => (value) => ({ type, value });

export const updateEmail = basicUpdate(UPDATE_EMAIL);
export const updatePassword = basicUpdate(UPDATE_PASSWORD);
export const updateConfirmedPassword = basicUpdate(UPDATE_CONFIRMED_PASSWORD);


export const resetPassword = (value) => (dispatch) => {

    dispatch(resetPasswordRequest());

    axios.post(`/reset-password-request`, { email: value })
        .then(() => {
            dispatch(resetPasswordSuccess());
            hashHistory.push('/reset-password-email-sent');
        })
        .catch((error) => {
            dispatch(resetPasswordFailure(error));
        });
};


export const resetPasswordRequest = () => ({
    type: RESET_PASSWORD_REQUEST,
    value: true
});

export const resetPasswordSuccess = () => ({
    type: RESET_PASSWORD_SUCCESS,
    value: false
});

export const resetPasswordFailure = (error) => ({
    type: RESET_PASSWORD_FAILURE,
    value: false,
    error
});
