import update from 'react-addons-update';
import * as actionTypes from '../actions/super-admin';


export const initialState = {
    students: [],
    lecturers: [],
    isFetchingSuperAdminDashboard: false,
    error: undefined
};

export function superAdmin (state = initialState, action) {

    switch (action.type) {

    case actionTypes.GET_SUPER_ADMIN_DASHBOARD_REQUEST:
        return update(state, {
            isFetchingSuperAdminDashboard: { $set: true }
        });

    case actionTypes.GET_SUPER_ADMIN_DASHBOARD_SUCCESS:
        return update(state, {
            isFetchingSuperAdminDashboard: { $set: false },
            students: { $set: action.data.students },
            lecturers: { $set: action.data.lecturers }
        });

    case actionTypes.GET_SUPER_ADMIN_DASHBOARD_FAILURE:
        return update(state, {
            isFetchingSuperAdminDashboard: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;
    }
}
