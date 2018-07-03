import update from 'react-addons-update';
import * as actionsTypes from '../actions/login';

export const initialState = {
    email: "",
    password: "",
    isAuthenticating: false,
    userIsAuthenticated: undefined,
    error: undefined,
    isMerging: false,
    redirectTo: undefined
};

export const login = (state = initialState, action ) => {
    switch (action.type) {

    case actionsTypes.UPDATE_EMAIL:
        return singleUpdate('email')(state, action);

    case actionsTypes.UPDATE_PASSWORD:
        return singleUpdate('password')(state, action);

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

    case actionsTypes.INCORRECT_USER_DETAILS:
        return update(state, {
            isAuthenticating: { $set: false },
            userIsAuthenticated: { $set: false },
            message: { $set: action.data }
        });

    case actionsTypes.MERGE_USER:
        return update(state, {
          isAuthenticating: { $set: false },
          isMerging: { $set: true }
        });

    case actionsTypes.ADD_REDIRECT:
        return update(state, {
          redirectTo: { $set: action.redirect }
        });

    case actionsTypes.CLEAR_REDIRECT:
        return update(state, {
          redirectTo: { $set: null }
        });

    default:
        return state;
    }
};

const singleUpdate  = (field) => (state, action) =>
    update(state, {
        [field]: { $set: action.value }
    });
