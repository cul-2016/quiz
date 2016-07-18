import update from 'react-addons-update';
import * as actionsTypes from '../actions/signup';

const initialState = {
    email: "",
    password: "",
    isFetchingSignup: false,
    error: undefined
};

export default function (state = initialState, action ) {
    switch (action.type) {

    case actionsTypes.UPDATE_EMAIL:
        return updateEmail(state, action);

    case actionsTypes.UPDATE_PASSWORD:
        return updatePassword(state, action);

    default:
        return state;
    }
}

function updateEmail (state, action) {
    return update(state, {
        email: { $set: action.value }
    });
}

function updatePassword (state, action) {
    return update(state, {
        password: { $set: action.value }
    });
}
