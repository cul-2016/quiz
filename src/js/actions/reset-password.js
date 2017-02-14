import request from '../lib/request.js';
import { hashHistory } from 'react-router';
import { logout } from './login';

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


export const resetPassword = (email) => (dispatch) => {

    dispatch(resetPasswordRequest());

    request.post(dispatch)(`/reset-password-request`, { email })
        .then((response) => {
            const message = response.data.message;
            if (message) {
                dispatch(resetPasswordFailure(message));
            }
            else {
                dispatch(resetPasswordSuccess());
                hashHistory.push('/reset-password-email-sent');
            }
        })
        .catch((error) => {
            dispatch(resetPasswordFailure(error));
        });
};

export const resetPasswordRequest = () => basicUpdate(RESET_PASSWORD_REQUEST)(true);
export const resetPasswordSuccess = () => basicUpdate(RESET_PASSWORD_SUCCESS)(false);
export const resetPasswordFailure = (error) => ({
    type: RESET_PASSWORD_FAILURE,
    value: false,
    error
});


export const submitNewPassword = (password, code) => dispatch => {

    dispatch(submitPasswordRequest());

    request.post(dispatch)('/submit-new-password', { password, code })
    .then(res => {
        const errorMessage = res.data.message;
        if (errorMessage) {
            dispatch(submitNewPasswordFailure(errorMessage));
        } else {
            dispatch(submitNewPasswordSuccess());
            dispatch(logout());
            hashHistory.push('/');
        }
    })
    .catch(() => {
        dispatch(submitNewPasswordFailure('Sorry, something went wrong!'));
    });
};

export const submitPasswordRequest = () => basicUpdate(SUBMIT_NEW_PASSWORD_REQUEST)(true);
export const submitNewPasswordSuccess = () => basicUpdate(SUBMIT_NEW_PASSWORD_SUCCESS)(false);
export const submitNewPasswordFailure = (error) => ({
    type: SUBMIT_NEW_PASSWORD_FAILURE,
    value: false,
    error
});
