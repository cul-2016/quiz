import update from 'react-addons-update';
import * as actionsTypes from '../actions/login';

const initialState = {
    email: "",
    password: "",
    isAuthenticating: false,
    error: undefined
};

export default function login (state = initialState, action ) {
    switch (action.type) {

    case actionsTypes.UPDATE_EMAIL:
        return updateEmail(state, action);

    case actionsTypes.UPDATE_PASSWORD:
        return updatePassword(state, action);

    case actionsTypes.AUTHENTICATE_USER_REQUEST:
        return update(state, {
            isAuthenticating: { $set: true }
        });

    case actionsTypes.AUTHENTICATE_USER_SUCCESS:
        return initialState;

    case actionsTypes.AUTHENTICATE_USER_FAILURE:
        return update(state, {
            isAuthenticating: { $set: false },
            error: { $set: action.error },
            password: { $set: "" }
        });

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
