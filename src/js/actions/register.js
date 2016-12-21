import axios from 'axios';
import { hashHistory } from 'react-router';
import { setUserDetails } from './user';


export const UPDATE_INPUT_FIELD = 'UPDATE_INPUT_FIELD';
export const USER_EXISTS = 'USER_EXISTS';

export const REGISTERING_USER_REQUEST = 'REGISTERING_USER_REQUEST';
export const REGISTERING_USER_SUCCESS = 'REGISTERING_USER_SUCCESS';
export const REGISTERING_USER_FAILURE = 'REGISTERING_USER_FAILURE';

export const updateInputField = (inputKey, value) => ({
    type: UPDATE_INPUT_FIELD,
    value,
    inputKey
});

export function registeringUser (email, username, password, is_lecturer) {

    return (dispatch) => {

        dispatch(registeringUserRequest());

        const payload = {
            email,
            username,
            password,
            is_lecturer
        };

        axios.post('/save-user', payload)
            .then((response) => {
                if (response.data === true) {
                    dispatch(userExists());
                } else if (response.data.emailSent) {
                    hashHistory.push('/please-verify');
                } else {
                    dispatch(registeringUserSuccess(true));
                    dispatch(setUserDetails(response.data));
                    hashHistory.push('/dashboard');
                }
            })
            .catch((error) => {
                dispatch(registeringUserFailure(error));
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

export const userExists = () => ({
    type: USER_EXISTS
});
