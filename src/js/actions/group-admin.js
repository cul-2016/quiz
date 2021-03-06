import request from '../lib/request.js';

export const GET_GROUP_ADMIN_DASHBOARD_REQUEST = 'GET_GROUP_ADMIN_DASHBOARD_REQUEST';
export const GET_GROUP_ADMIN_DASHBOARD_SUCCESS = 'GET_GROUP_ADMIN_DASHBOARD_SUCCESS';
export const GET_GROUP_ADMIN_DASHBOARD_FAILURE = 'GET_GROUP_ADMIN_DASHBOARD_FAILURE';

export const UPDATE_USER_IS_ACTIVE_REQUEST = 'UPDATE_USER_IS_ACTIVE_REQUEST';
export const UPDATE_USER_IS_ACTIVE_SUCCESS = 'UPDATE_USER_IS_ACTIVE_SUCCESS';
export const UPDATE_USER_IS_ACTIVE_FAILURE = 'UPDATE_USER_IS_ACTIVE_FAILURE';

export const DOWNLOAD_DATA_REQUEST = 'DOWNLOAD_DATA_REQUEST';
export const DOWNLOAD_DATA_SUCCESS = 'DOWNLOAD_DATA_SUCCESS';
export const DOWNLOAD_DATA_FAILURE = 'DOWNLOAD_DATA_FAILURE';

export const getGroupAdminDashboard = () => (dispatch) => {

    dispatch(getGroupAdminDashboardRequest());

    request.get(dispatch)(`/admin-dashboard`)
        .then((response) => {
            dispatch(getGroupAdminDashboardSuccess(response.data));
        })
        .catch((error) => {
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

export const updateUserIsActive = (user_id) => (dispatch) => {
    dispatch(updateUserIsActiveRequest());
    request.post(dispatch)(`/group-admin/update`, { user_id })
        .then((response) => {
            dispatch(updateUserIsActiveSuccess(response));
            dispatch(getGroupAdminDashboard());
        })
        .catch((error) => {
            const customError = Object.assign({}, error, { reducerState: 'groupAdmin' });
            dispatch(updateUserIsActiveFailure(customError));
        });
};

export const updateUserIsActiveRequest = () => ({
    type: UPDATE_USER_IS_ACTIVE_REQUEST
});

export const updateUserIsActiveSuccess = () => ({
    type: UPDATE_USER_IS_ACTIVE_SUCCESS
});

export const updateUserIsActiveFailure = (error) => ({
    type: UPDATE_USER_IS_ACTIVE_FAILURE,
    error
});

export const downloadData = (url) => (dispatch) => {
    dispatch(downloadDataRequest());
    request.get(dispatch)(url)
        .then((response) => {
            window.location.href = response.request.responseURL;
            dispatch(downloadDataSuccess());
            dispatch(getGroupAdminDashboard());
        })
        .catch((error) => {
            const customError = Object.assign({}, error, { reducerState: 'groupAdmin' });
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
