import axios from 'axios';

export const GET_DASHBOARD_REQUEST = 'GET_DASHBOARD_REQUEST';
export const GET_DASHBOARD_SUCCESS = 'GET_DASHBOARD_SUCCESS';
export const GET_DASHBOARD_FAILURE = 'GET_DASHBOARD_FAILURE';


export function getDashboard () {

    return (dispatch) => {

        dispatch(getDashboardRequest());

        let userID = 1;

        axios.get(`/get-modules?user_id=${userID}`)
            .then((response) => {
                dispatch(getDashboardSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
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
