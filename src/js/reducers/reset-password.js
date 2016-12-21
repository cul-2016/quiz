import update from 'react-addons-update';
import * as actionsTypes from '../actions/reset-password';

export const initialState = {
    email: "",
    password: "",
    confirmedPassword: "",
    token: undefined,
    isRequesting: false,
    error: undefined
};

export const resetPassword = (state = initialState, action ) => {
    switch (action.type) {

    case actionsTypes.UPDATE_EMAIL:
        return composeUpdate('email')(state, action);

    case actionsTypes.UPDATE_PASSWORD:
        return composeUpdate('password')(state, action);

    case actionsTypes.UPDATE_CONFIRMED_PASSWORD:
        return composeUpdate('confirmedPassword')(state, action);

    case actionsTypes.RESET_PASSWORD_REQUEST:
    case actionsTypes.RESET_PASSWORD_SUCCESS:
    case actionsTypes.SUBMIT_NEW_PASSWORD_REQUEST:
        return composeUpdate('isRequesting')(state, action);
    case actionsTypes.SUBMIT_NEW_PASSWORD_SUCCESS:
        return initialState;

    case actionsTypes.RESET_PASSWORD_FAILURE:
    case actionsTypes.SUBMIT_NEW_PASSWORD_FAILURE:
        return requestFailure(state, action);

    default:
        return state;
    }
};

const composeUpdate  = (field) => (state, action) =>
    update(state, {
        [field]: { $set: action.value }
    });

const requestFailure = (state, action) =>
    update(state, {
        isRequesting: { $set: action.value },
        error: { $set: action.error }
    });
