import request from '../lib/request.js';
import { hashHistory } from 'react-router';

export const SUBMIT_CLIENT_REQUEST = 'SUBMIT_CLIENT_REQUEST';
export const SUBMIT_CLIENT_SUCCESS = 'SUBMIT_CLIENT_SUCCESS';
export const SUBMIT_CLIENT_FAILURE = 'SUBMIT_CLIENT_FAILURE';
export const UPDATE_INPUT = 'UPDATE_INPUT';
export const GET_SUPER_ADMIN_DASHBOARD_REQUEST = 'GET_SUPER_ADMIN_DASHBOARD_REQUEST';
export const GET_SUPER_ADMIN_DASHBOARD_SUCCESS = 'GET_SUPER_ADMIN_DASHBOARD_SUCCESS';
export const GET_SUPER_ADMIN_DASHBOARD_FAILURE = 'GET_SUPER_ADMIN_DASHBOARD_FAILURE';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';
export const DOWNLOAD_DATA_REQUEST = 'DOWNLOAD_DATA_REQUEST';
export const DOWNLOAD_DATA_SUCCESS = 'DOWNLOAD_DATA_SUCCESS';
export const DOWNLOAD_DATA_FAILURE = 'DOWNLOAD_DATA_FAILURE';




export const submitClient = ({ name, email, institution, department, accountType, paid }) => (dispatch) => {
    const payload = {
        name,
        email,
        institution,
        department,
        accountType,
        paid
    };
    dispatch(submitClientRequest());
    request.post(dispatch)('/super-admin/client', payload)
        .then(() => {
            dispatch(submitClientSuccess());
            hashHistory.push('/super-admin');
        })
        .catch((error) => {
            dispatch(submitClientFailure(error));
        });
};

export const submitClientRequest = () => ({
    type: SUBMIT_CLIENT_REQUEST
});

export const submitClientSuccess = () => ({
    type: SUBMIT_CLIENT_SUCCESS

});

export const submitClientFailure = (error) => ({
    type: SUBMIT_CLIENT_FAILURE,
    error
});


export const getSuperAdminDashboard = () => (dispatch) => {
    dispatch(getSuperAdminDashboardRequest());
    request.get(dispatch)(`/super-admin`)
        .then((response) => {
            dispatch(getSuperAdminDashboardSuccess(response.data));
        })
        .catch((serverError) => {
            const error = Object.assign({}, serverError, { reducerState: 'superAdmin' });
            dispatch(getSuperAdminDashboardFailure(error));
        });
};

export const getSuperAdminDashboardRequest = () => ({
    type: GET_SUPER_ADMIN_DASHBOARD_REQUEST
});

export const getSuperAdminDashboardSuccess = (data) => ({
    type: GET_SUPER_ADMIN_DASHBOARD_SUCCESS,
    data
});

export const getSuperAdminDashboardFailure = (error) => ({
    type: GET_SUPER_ADMIN_DASHBOARD_FAILURE,
    error
});

export const editUser = (user) => ({
    type: EDIT_USER,
    user
});

export const deleteUser = (user_id) => (dispatch) => {
    dispatch(deleteUserRequest());
    request.post(dispatch)(`/super-admin/delete`, { user_id })
        .then((response) => {
            dispatch(deleteUserSuccess(response));
            dispatch(getSuperAdminDashboard());
        })
        .catch((error) => {
            const customError = Object.assign({}, error, { reducerState: 'superAdmin' });
            dispatch(deleteUserFailure(customError));
        });
};

export const deleteUserRequest = () => ({
    type: DELETE_USER_REQUEST
});

export const deleteUserSuccess = () => ({
    type: DELETE_USER_SUCCESS
});

export const deleteUserFailure = (error) => ({
    type: DELETE_USER_FAILURE,
    error
});

export const downloadData = (url) => (dispatch) => {
    dispatch(downloadDataRequest());
    request.get(dispatch)(url)
        .then((response) => {
            window.location.href = response.request.responseURL;
            dispatch(downloadDataSuccess());
            dispatch(getSuperAdminDashboard());
        })
        .catch((error) => {
            const customError = Object.assign({}, error, { reducerState: 'superAdmin' });
            dispatch(downloadDataFailure(customError));
        });
};

export const downloadDataRequest = () => ({
    type: DOWNLOAD_DATA_REQUEST
});

export const downloadDataSuccess = () => ({
    type: DOWNLOAD_DATA_SUCCESS
});

export const downloadDataFailure = (error) => ({
    type: DOWNLOAD_DATA_FAILURE,
    error
});

export const updateInput = (value, name) => ({
    value,
    name,
    type: UPDATE_INPUT
});
