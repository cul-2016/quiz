import update from 'react-addons-update';
import * as actionTypes from '../actions/dashboard';


const initialState = {
    data: [],
    isFetchingDashboard: false,
    error: undefined
};

export default function dashboard (state = initialState, action) {

    switch (action.type) {

    case actionTypes.GET_DASHBOARD_REQUEST:
        return update(state, {
            isFetchingDashboard: { $set: true }
        });

    case actionTypes.GET_DASHBOARD_SUCCESS:
        return update(state, {
            isFetchingDashboard: { $set: false },
            data: { $set: action.data }
        });

    case actionTypes.GET_DASHBOARD_FAILURE:
        return update(state, {
            isFetchingDashboard: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;
    }
}
