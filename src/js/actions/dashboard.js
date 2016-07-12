// import axios from 'axios';

export const GET_DASHBOARD_REQUEST = 'GET_DASHBOARD_REQUEST';

export function getDashboard () {

    return (dispatch) => {

        dispatch(getDashboardRequest());
    };
}

export const getDashboardRequest = () => ({
    type: GET_DASHBOARD_REQUEST,
    isFetchingDashboard: true
});
