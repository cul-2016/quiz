import update from 'react-addons-update';
import * as actionsTypes from '../actions/dashboard';


const initialState = {
    data: [],
    isFetchingDashboard: false,
    error: undefined
};

export default function dashboard (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.GET_DASHBOARD_REQUEST:
        return update(state, {
            isFetchingDashboard: { $set: true }
        });

    case actionsTypes.GET_DASHBOARD_SUCCESS:
        return update(state, {
            isFetchingDashboard: { $set: false },
            data: { $set: action.data }
        });

    case actionsTypes.GET_DASHBOARD_FAILURE:
        return update(state, {
            isFetchingDashboard: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;
    }
}
