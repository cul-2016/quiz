import update from 'react-addons-update';
import * as actionsTypes from '../actions/reset-password';

export const initialState = {
    email: "",
    password: "",
    confirmedPassword: "",
    token: undefined
};

export const resetPassword = (state = initialState, action ) => {
    switch (action.type) {

    case actionsTypes.UPDATE_EMAIL:
        return composeUpdate('email')(state, action);

    case actionsTypes.UPDATE_PASSWORD:
        return composeUpdate('password')(state, action);

    case actionsTypes.UPDATE_CONFIRMED_PASSWORD:
        return composeUpdate('confirmedPassword')(state, action);

    default:
        return state;
    }
};

const composeUpdate  = (field) => (state, action) =>
    update(state, {
        [field]: { $set: action.value }
    });
