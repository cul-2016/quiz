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
    isSavingClient: false,
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
            lecturers: { $set: action.data.lecturers }
        });

    case actionTypes.GET_SUPER_ADMIN_DASHBOARD_FAILURE:
        return update(state, {
            isFetchingSuperAdminDashboard: { $set: false },
            error: { $set: action.error }
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

    case actionTypes.DISPLAY_ERROR:
        return update(state, {
            error: { $set: action.error }
        });

    case actionTypes.SUBMIT_CLIENT_REQUEST:
        return update(state, {
            isSavingClient: { $set: true }
        });

    case actionTypes.SUBMIT_CLIENT_SUCCESS:
        return initialState;

    case actionTypes.SUBMIT_CLIENT_FAILURE:
        return update(state, {
            isSavingClient: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;
    }
}
