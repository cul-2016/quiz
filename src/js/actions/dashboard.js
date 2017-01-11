import request from '../lib/request.js';

export const GET_DASHBOARD_REQUEST = 'GET_DASHBOARD_REQUEST';
export const GET_DASHBOARD_SUCCESS = 'GET_DASHBOARD_SUCCESS';
export const GET_DASHBOARD_FAILURE = 'GET_DASHBOARD_FAILURE';

export function getDashboard () {

    return (dispatch) => {

        dispatch(getDashboardRequest());
        request.get(dispatch)(`/get-module-list`)
            .then((response) => {
                dispatch(getDashboardSuccess(response.data));
            })
            .catch((serverError) => {
                const error = Object.assign({}, serverError, { reducerState: 'dashboard' });
                dispatch(getDashboardFailure(error));
            });
    };
}

export const getDashboardRequest = () => ({
    type: GET_DASHBOARD_REQUEST,
    isFetchingDashboard: true
});

export const getDashboardSuccess = (data) => ({
    type: GET_DASHBOARD_SUCCESS,
    isFetchingDashboard: false,
    data
});

export const getDashboardFailure = (error) => ({
    type: GET_DASHBOARD_FAILURE,
    isFetchingDashboard: false,
    error
});
