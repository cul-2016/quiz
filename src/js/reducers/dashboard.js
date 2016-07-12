import update from 'react-addons-update';
import { GET_DASHBOARD_REQUEST } from '../actions/dashboard';


const initialState = {
    data: [],
    isFetchingDashboard: false
};

export default function dashboard (state = initialState, action) {

    switch (action.type) {

    case GET_DASHBOARD_REQUEST:
        return update(state, {
            isFetchingDashboard: { $set: true }
        });

    default:
        return state;
    }
}
