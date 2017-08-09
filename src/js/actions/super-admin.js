import request from '../lib/request.js';

export const GET_SUPER_ADMIN_DASHBOARD_REQUEST = 'GET_SUPER_ADMIN_DASHBOARD_REQUEST';
export const GET_SUPER_ADMIN_DASHBOARD_SUCCESS = 'GET_SUPER_ADMIN_DASHBOARD_SUCCESS';
export const GET_SUPER_ADMIN_DASHBOARD_FAILURE = 'GET_SUPER_ADMIN_DASHBOARD_FAILURE';

export function getSuperAdminDashboard () {

    return (dispatch) => {

        dispatch(getSuperAdminDashboardRequest());
        request.get(dispatch)(`/super-admin`)
            .then((response) => {
                dispatch(getSuperAdminDashboardSuccess(response.data));
            })
            .catch((serverError) => {
                const error = Object.assign({}, serverError, { reducerState: 'superAdminDashboard' });
                dispatch(getSuperAdminDashboardFailure(error));
            });
    };
}

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

export function deleteUser (user_id) {
    console.log(`Deleting user: ${user_id}`);
}
