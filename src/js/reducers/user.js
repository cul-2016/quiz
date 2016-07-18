import update from 'react-addons-update';
import * as actionsTypes from '../actions/user';

const initialState = {
    user_id: undefined,
    email: undefined,
    username: undefined,
    is_lecturer: undefined,
    isFetchingUser: false,
    error: undefined
};

export default function (state = initialState, action ) {
    switch (action.type) {

    case actionsTypes.SET_USER_DETAILS:
        return setUserDetails(state, action);

    default:
        return state;
    }
}

function setUserDetails (state, action) {
    return update(state, {
        user_id: { $set: action.data.user_id },
        email: { $set: action.data.email },
        username: { $set: action.data.username },
        is_lecturer: { $set: action.data.is_lecturer },
    });
}
