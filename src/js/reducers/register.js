import update from 'react-addons-update';
import * as actionsTypes from '../actions/register';

const initialState = {
    email: "",
    username: "",
    password: "",
    isRegistering: false,
    error: undefined,
    userIsRegistered: undefined,
    userExists: false
};


export default function register (state = initialState, action ) {
    switch (action.type) {

    case actionsTypes.UPDATE_INPUT_FIELD:
        return update(state, {
            [action.inputKey]: { $set: action.value }
        });

    case actionsTypes.USER_EXISTS:
        return update(state, {
            userExists: { $set: true }
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

    default:
        return state;
    }

}
