import request from '../lib/request.js';
import { hashHistory } from 'react-router';
import { setUserDetails } from './user';
import { mergeUser } from './login';


export const UPDATE_INPUT_FIELD = 'UPDATE_INPUT_FIELD';

export const REGISTERING_USER_REQUEST = 'REGISTERING_USER_REQUEST';
export const REGISTERING_USER_SUCCESS = 'REGISTERING_USER_SUCCESS';
export const REGISTERING_USER_FAILURE = 'REGISTERING_USER_FAILURE';
export const TOGGLE_TC_AGREED = 'TOGGLE_TC_AGREED';
export const SHOW_TC_AGREED_ERROR = 'SHOW_TC_AGREED_ERROR';
export const REGISTERING_USER_MERGE = 'REGISTERING_USER_MERGE';

export const updateInputField = (inputKey, value) => ({
    type: UPDATE_INPUT_FIELD,
    value,
    inputKey
});

export function registeringUser (email, username, password, is_lecturer, group_code, moduleId) {
    return (dispatch) => {

        dispatch(registeringUserRequest());

        const payload = {
            email,
            username,
            password,
            is_lecturer,
            group_code
        };

        request.post(dispatch)('/save-user', payload)
            .then((response) => {
                if (response.data.mergeUsers) {
                    dispatch(mergeUsers());
                    dispatch(mergeUser());
                    hashHistory.push('/merge-users')
                } else if (response.data.message) {
                    dispatch(registeringUserFailure(response.data.message));
                } else if (response.data.emailSent) {
                    dispatch(registeringUserSuccess(true));
                    hashHistory.push('/please-verify');
                } else {
                    dispatch(registeringUserSuccess(true));
                    dispatch(setUserDetails(response.data));
                    if (moduleId) {
                      hashHistory.push(`/${moduleId}/student`);
                    } else {
                      hashHistory.push('/dashboard');
                    }
                }
            })
            .catch((err) => {
                console.error(err);
                dispatch(registeringUserFailure('Sorry, something went wrong'));
            });
    };
}

export const registeringUserRequest = () => ({
    type: REGISTERING_USER_REQUEST
});

export const registeringUserSuccess = (data) => ({
    type: REGISTERING_USER_SUCCESS,
    data
});

export const registeringUserFailure = (error) => ({
    type: REGISTERING_USER_FAILURE,
    error
});
export const toggleTcAgreed = () => ({
    type: TOGGLE_TC_AGREED
});

export const showTcAgreedError = () => ({
    type: SHOW_TC_AGREED_ERROR,
    error: 'Please agree to the privacy statement before proceeding'
});

export const mergeUsers = () => ({
    type: REGISTERING_USER_MERGE
});
