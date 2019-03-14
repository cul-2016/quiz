import update from 'react-addons-update';
import * as actionsTypes from '../actions/register';

const initialState = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    isRegistering: false,
    error: undefined,
    userIsRegistered: undefined,
    userExists: false,
    tcAgreed: false,
    cookieAgreed: false,
    group_code: "",
    mergeUsers: false
};


export default function register(state = initialState, action) {
    switch (action.type) {

        case actionsTypes.UPDATE_INPUT_FIELD:
            return update(state, {
                [action.inputKey]: { $set: action.value },
                error: { $set: undefined }
            });

        case actionsTypes.REGISTERING_USER_REQUEST:
            return update(state, {
                isRegistering: { $set: true }
            });

        case actionsTypes.REGISTERING_USER_SUCCESS:
            return update(state, {
                isRegistering: { $set: false },
                userIsRegistered: { $set: action.data }
            });

        case actionsTypes.REGISTERING_USER_FAILURE:
            return update(state, {
                isRegistering: { $set: false },
                error: { $set: action.error }
            });

        case actionsTypes.TOGGLE_TC_AGREED:
            return update(state, {
                tcAgreed: { $set: !state.tcAgreed }
            });
        case actionsTypes.SHOW_TC_AGREED_ERROR:
            return update(state, {
                error: { $set: action.error }
            });

        case actionsTypes.TOGGLE_COOKIES_AGREED:
            return update(state, {
                cookiesAgreed: { $set: !state.cookiesAgreed }
            });

        case actionsTypes.SHOW_COOKIES_AGREED_ERROR:
            return update(state, {
                error: { $set: action.error }
            });

        case actionsTypes.REGISTERING_USER_MERGE:
            return update(state, {
                isRegistering: { $set: false },
                mergeUsers: { $set: true }
            });

        default:
            return state;
    }

}
