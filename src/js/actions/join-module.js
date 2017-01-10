import axios from 'axios';
import { hashHistory } from 'react-router';
import { logout } from './login.js';

export const INPUT_CHANGE = 'INPUT_CHANGE';

export const JOIN_MODULE_REQUEST = 'JOIN_MODULE_REQUEST';
export const JOIN_MODULE_SUCCESS = 'JOIN_MODULE_SUCCESS';
export const JOIN_MODULE_FAILURE = 'JOIN_MODULE_FAILURE';
export const CLEAR_JOIN_MODULE = 'CLEAR_JOIN_MODULE';


export const inputChange = (value) => ({
    type: INPUT_CHANGE,
    value
});

export function joinModule (module_id) {

    return (dispatch) => {

        dispatch(joinModuleRequest());
        axios.get(`/join-module?module_id=${module_id}`)
            .then(() => {

                dispatch(joinModuleSuccess());
                hashHistory.push('/dashboard');
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    dispatch(logout());
                    hashHistory.push('/');
                }
                dispatch(joinModuleFailure(error));
            });
    };
}

export const joinModuleRequest = () => ({
    type: JOIN_MODULE_REQUEST
});

export const joinModuleSuccess = () => ({
    type: JOIN_MODULE_SUCCESS,
});

export const joinModuleFailure = (error) => ({
    type: JOIN_MODULE_FAILURE,
    error
});

export const clearJoinModule = () => ({
    type: CLEAR_JOIN_MODULE
});
