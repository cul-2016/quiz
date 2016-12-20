import axios from 'axios';
import { hashHistory } from 'react-router';

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_CONFIRMED_PASSWORD = 'UPDATE_CONFIRMED_PASSWORD';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const SUBMIT_NEW_PASSWORD_REQUEST = 'SUBMIT_NEW_PASSWORD_REQUEST';
export const SUBMIT_NEW_PASSWORD_SUCCESS = 'SUBMIT_NEW_PASSWORD_SUCCESS';
export const SUBMIT_NEW_PASSWORD_FAILURE = 'SUBMIT_NEW_PASSWORD_FAILURE';

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


export const submitNewPassword = (password, code) => dispatch => {

    dispatch(submitPasswordRequest());

    axios.post('/submit-new-password', { password, code })
    .then(res => {
        const errorMessage = res.data.message;
        if (errorMessage) {
            dispatch(submitNewPasswordFailure(errorMessage));
        } else {
            dispatch(submitNewPasswordSuccess());
            hashHistory.push('/');
        }
    })
    .catch(() => {
        dispatch(submitNewPasswordFailure('Sorry, something went wrong!'));
    });
};
export const submitPasswordRequest = () => ({
    type: SUBMIT_NEW_PASSWORD_REQUEST,
    value: true
});
export const submitNewPasswordSuccess = () => ({
    type: SUBMIT_NEW_PASSWORD_SUCCESS,
    value: false
});
export const submitNewPasswordFailure = (error) => ({
    type: SUBMIT_NEW_PASSWORD_FAILURE,
    value: false,
    error
});
