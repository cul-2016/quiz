import axios from 'axios';
import getUserID from '../lib/getUserID';
import { store } from '../store';

export const GET_DASHBOARD_REQUEST = 'GET_DASHBOARD_REQUEST';
export const GET_DASHBOARD_SUCCESS = 'GET_DASHBOARD_SUCCESS';
export const GET_DASHBOARD_FAILURE = 'GET_DASHBOARD_FAILURE';


export function getDashboard () {

    return (dispatch) => {

        dispatch(getDashboardRequest());

        let userID = getUserID();
        let is_lecturer = store.getState().user.is_lecturer;

        axios.get(`/get-module-list?user_id=${userID}&is_lecturer=${is_lecturer}`)
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
