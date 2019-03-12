import request from '../lib/request.js';
import { hashHistory } from 'react-router';
import { setUserDetails } from './user';
import { mergeUser, addRedirect } from './login';
import { createMoodleModule } from './new-module';


export const UPDATE_INPUT_FIELD = 'UPDATE_INPUT_FIELD';

export const REGISTERING_USER_REQUEST = 'REGISTERING_USER_REQUEST';
export const REGISTERING_USER_SUCCESS = 'REGISTERING_USER_SUCCESS';
export const REGISTERING_USER_FAILURE = 'REGISTERING_USER_FAILURE';
export const TOGGLE_TC_AGREED = 'TOGGLE_TC_AGREED';
export const SHOW_TC_AGREED_ERROR = 'SHOW_TC_AGREED_ERROR';
export const TOGGLE_COOKIES_AGREED = 'TOGGLE_COOKIES_AGREED';
export const SHOW_COOKIES_AGREED_ERROR = 'SHOW_COOKIES_AGREED_ERROR';
export const REGISTERING_USER_MERGE = 'REGISTERING_USER_MERGE';

export const updateInputField = (inputKey, value) => ({
    type: UPDATE_INPUT_FIELD,
    value,
    inputKey
});

export function registeringUser(email, username, password, is_lecturer, group_code, moduleId) {
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
                if (response.data.message) {
                    dispatch(registeringUserFailure(response.data.message));
                } else if (response.data.emailSent) {
                    dispatch(registeringUserSuccess(true));
                    hashHistory.push('/please-verify');
                } else {
                    dispatch(registeringUserSuccess(true));
                    dispatch(setUserDetails(response.data));
                    if (moduleId) {
                        if (!is_lecturer) {
                            hashHistory.push(`/${moduleId}/student`);
                        } else {
                            request.post(dispatch)(`/get-module?module-id=${moduleId}`)
                                .then(response => {
                                    hashHistory.push(`/${moduleId}/lecturer`);
                                })
                                .catch(err => {
                                    if (err.response.status === 404) {
                                        dispatch(createMoodleModule(moduleId));
                                        hashHistory.push(`/add-new-module`);
                                    };
                                })
                        }
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
    error: 'You need to accept the privacy policy to register'
});

export const toggleCookiesAgreed = () => ({
    type: TOGGLE_COOKIES_AGREED
});

export const showCookiesAgreedError = () => ({
    type: SHOW_COOKIES_AGREED_ERROR,
    error: 'You need to consent to the use of cookies to register'
});

export const mergeUsers = () => ({
    type: REGISTERING_USER_MERGE
});
