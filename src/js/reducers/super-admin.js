import update from 'react-addons-update';
import * as actionTypes from '../actions/super-admin';


export const initialState = {
    students: [],
    lecturers: [],
    manageClient: {
        name: '',
        email: '',
        institution: '',
        department: '',
        accountType: null,
        paid: false,
        code: null
    },
    isFetchingSuperAdminDashboard: false,
    isDeletingUser: false,
    isDownloadingData: false,
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
            lecturers: { $set: action.data.lecturers },
            clients: { $set: action.data.clients }
        });

    case actionTypes.GET_SUPER_ADMIN_DASHBOARD_FAILURE:
        return update(state, {
            isFetchingSuperAdminDashboard: { $set: false },
            error: { $set: action.error }
        });

    case actionTypes.EDIT_USER:
        return update(state, {
            manageClient: {
                name: { $set: action.user.name },
                email: { $set: action.user.email },
                institution: { $set: action.user.institution },
                department: { $set: action.user.department },
                accountType: { $set: action.user.account_type },
                paid: { $set: action.user.paid }
            }
        });

    case actionTypes.DELETE_USER_REQUEST:
        return update(state, {
            isDeletingUser: { $set: true }
        });

    case actionTypes.DELETE_USER_SUCCESS:
        return update(state, {
            isDeletingUser: { $set: false }
        });
    case actionTypes.DELETE_USER_FAILURE:
        return update(state, {
            isDeletingUser: { $set: false },
            error: { $set: action.error }
        });
    case actionTypes.DOWNLOAD_DATA_REQUEST:
        return update(state, {
            isDownloadingData: { $set: true }
        });

    case actionTypes.DOWNLOAD_DATA_SUCCESS:
        return update(state, {
            isDownloadingData: { $set: false }
        });
    case actionTypes.DOWNLOAD_DATA_FAILURE:
        return update(state, {
            isDownloadingData: { $set: false },
            error: { $set: action.error }
        });

    case actionTypes.UPDATE_INPUT:
        return update(state, {
            manageClient: {
                [action.name]: { $set: action.value }
            }
        });

    default:
        return state;
    }
}
