import request from '../lib/request.js';

export const GET_GROUP_ADMIN_DASHBOARD_REQUEST = 'GET_GROUP_ADMIN_DASHBOARD_REQUEST';
export const GET_GROUP_ADMIN_DASHBOARD_SUCCESS = 'GET_GROUP_ADMIN_DASHBOARD_SUCCESS';
export const GET_GROUP_ADMIN_DASHBOARD_FAILURE = 'GET_GROUP_ADMIN_DASHBOARD_FAILURE';

export const DELETE_LECTURER_REQUEST = 'DELETE_LECTURER_REQUEST';
export const DELETE_LECTURER_SUCCESS = 'DELETE_LECTURER_SUCCESS';
export const DELETE_LECTURER_FAILURE = 'DELETE_LECTURER_FAILURE';

export const getGroupAdminDashboard = () => (dispatch) => {

    dispatch(getGroupAdminDashboardRequest());

    request.get(dispatch)(`/admin-dashboard`)
        .then((response) => {
            console.log(response, 'resss');

            dispatch(getGroupAdminDashboardSuccess(response.data));
        })
        .catch((error) => {
            console.log('error', error)
            dispatch(getGroupAdminDashboardFailure(error));
        });
};

export const getGroupAdminDashboardRequest = () => ({
    type: GET_GROUP_ADMIN_DASHBOARD_REQUEST
});

export const getGroupAdminDashboardSuccess = (data) => ({
    type: GET_GROUP_ADMIN_DASHBOARD_SUCCESS,
    data
});

export const getGroupAdminDashboardFailure = (error) => ({
    type: GET_GROUP_ADMIN_DASHBOARD_FAILURE,
    error
});

export const deleteLecturer = (user_id) => (dispatch) => {
    dispatch(deleteLecturerRequest());
    request.post(dispatch)(`/group-admin/delete`, { user_id })
        .then((response) => {
            dispatch(deleteLecturerSuccess(response));
            dispatch(getGroupAdminDashboard());
        })
        .catch((error) => {
            const customError = Object.assign({}, error, { reducerState: 'superAdmin' });
            dispatch(deleteLecturerFailure(customError));
        });
};

export const deleteLecturerRequest = () => ({
    type: DELETE_LECTURER_REQUEST
});

export const deleteLecturerSuccess = () => ({
    type: DELETE_LECTURER_SUCCESS
});

export const deleteLecturerFailure = (error) => ({
    type: DELETE_LECTURER_FAILURE,
    error
});
