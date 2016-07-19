import update from 'react-addons-update';
import * as actionsTypes from '../actions/register';

const initialState = {
    email: "",
    username: "",
    password: "",
    isRegistering: false,
    error: undefined,
    userIsRegistered: undefined
};


export default function (state = initialState, action ) {
    switch (action.type) {

    case actionsTypes.UPDATE_INPUT_FIELD:
        return update(state, {
            [action.inputKey]: { $set: action.value }
        });

    default:
        return state;
    }

}
