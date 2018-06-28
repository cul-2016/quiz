import request from '../lib/request.js';
import { hashHistory } from 'react-router';
import { setUserDetails } from './user';

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

export const AUTHENTICATE_USER_REQUEST = 'AUTHENTICATE_USER_REQUEST';
export const AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS';
export const AUTHENTICATE_USER_FAILURE = 'AUTHENTICATE_USER_FAILURE';

export const LOGOUT = 'LOGOUT';
export const CLEAR_INITIAL_STATE = 'CLEAR_INITIAL_STATE';
export const INCORRECT_USER_DETAILS = 'INCORRECT_USER_DETAILS';

export const MERGE_USER = 'MERGE_USER';

const basicUpdate = (type) => (value) => ({ type, value });
export const updateEmail = basicUpdate(UPDATE_EMAIL);
export const updatePassword = basicUpdate(UPDATE_PASSWORD);

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

        request.post(dispatch)('/authenticate-user', payload)
            .then((response) => {
                if (response.data.message) {
                    dispatch(incorrectUserDetails(response.data.message));
                }
                else {
                    dispatch(authenticateUserSuccess());
                    dispatch(setUserDetails(response.data));
                    hashHistory.push('/dashboard');
                }
            })
            .catch((error) => {
                dispatch(authenticateUserFailure(error));
            });
    };
}

export function migrateUser (email, password) {

    return (dispatch) => {

        dispatch(authenticateUserRequest());

        const payload = {
            email,
            password
        };

        request.post(dispatch)('/migrate-user', payload)
            .then((response) => {
                if (response.data.message) {
                    dispatch(incorrectUserDetails(response.data.message));
                }
                else {
                    dispatch(authenticateUserSuccess());
                    dispatch(setUserDetails(response.data));
                    hashHistory.push('/dashboard');
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

export const authenticateUserSuccess = () => ({
    type: AUTHENTICATE_USER_SUCCESS
});

export const authenticateUserFailure = (error) => ({
    type: AUTHENTICATE_USER_FAILURE,
    error
});

export const logout = () => ({
    type: LOGOUT
});

export const clearInitialState = () => ({
    type: CLEAR_INITIAL_STATE
});

export const incorrectUserDetails = (data) => ({
    type: INCORRECT_USER_DETAILS,
    data
});

export const mergeUser = () => ({
  type: MERGE_USER
});
