import update from 'react-addons-update';
import * as actionTypes from '../actions/group-admin';


export const initialState = {
    lecturers: [],
    user_count: undefined,
    user_limit: undefined,
    isFetchingGroupAdminDashboard: false,
    isUpdatingUser: false,
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
            user_count: { $set: action.data.userAccountLimitInformation.count },
            user_limit: { $set: action.data.userAccountLimitInformation.user_limit }
        });

    case actionTypes.GET_GROUP_ADMIN_DASHBOARD_FAILURE:
        return update(state, {
            isFetchingGroupAdminDashboard: { $set: false },
            error: { $set: action.error }
        });

    case actionTypes.UPDATE_USER_IS_ACTIVE_REQUEST:
        return update(state, {
            isUpdatingUser: { $set: true }
        });

    case actionTypes.UPDATE_USER_IS_ACTIVE_SUCCESS:
        return update(state, {
            isUpdatingUser: { $set: false }
        });
    case actionTypes.UPDATE_USER_IS_ACTIVE_FAILURE:
        return update(state, {
            isUpdatingUser: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;

    }
}
