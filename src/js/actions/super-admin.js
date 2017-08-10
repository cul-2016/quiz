import request from '../lib/request.js';

export const GET_SUPER_ADMIN_DASHBOARD_REQUEST = 'GET_SUPER_ADMIN_DASHBOARD_REQUEST';
export const GET_SUPER_ADMIN_DASHBOARD_SUCCESS = 'GET_SUPER_ADMIN_DASHBOARD_SUCCESS';
export const GET_SUPER_ADMIN_DASHBOARD_FAILURE = 'GET_SUPER_ADMIN_DASHBOARD_FAILURE';
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

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
