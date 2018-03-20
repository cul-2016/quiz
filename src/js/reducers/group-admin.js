import update from 'react-addons-update';
import * as actionTypes from '../actions/group-admin';


export const initialState = {
    lecturers: [],
    isFetchingGroupAdminDashboard: false,
    isDeletingLecturer: false,
    error: undefined
};

export function groupAdmin (state = initialState, action) {

    switch (action.type) {



    case actionTypes.GET_GROUP_ADMIN_DASHBOARD_REQUEST:
        return update(state, {
            isFetchingGroupAdminDashboard: { $set: true }
        });

    case actionTypes.GET_GROUP_ADMIN_DASHBOARD_SUCCESS:
        return update(state, {
            isFetchingGroupAdminDashboard: { $set: false },
            lecturers: { $set: action.data.lecturers },
        });

    case actionTypes.GET_GROUP_ADMIN_DASHBOARD_FAILURE:
        return update(state, {
            isFetchingGroupAdminDashboard: { $set: false },
            error: { $set: action.error }
        });

    case actionTypes.DELETE_LECTURER_REQUEST:
        return update(state, {
            isDeletingLecturer: { $set: true }
        });

    case actionTypes.DELETE_LECTURER_SUCCESS:
        return update(state, {
            isDeletingLecturer: { $set: false }
        });
    case actionTypes.DELETE_LECTURER_FAILURE:
        return update(state, {
            isDeletingLecturer: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;

    }
}
