import update from 'react-addons-update';
import * as actionsTypes from '../actions/user';
import isPopupRequired from '../lib/isPopupRequiredV2';

const initialState = {
    user_id: undefined,
    email: undefined,
    username: undefined,
    is_lecturer: undefined,
    isFetchingUser: false,
    cookieMessage: isPopupRequired(),
    error: undefined
};

export default function user (state = initialState, action ) {
    switch (action.type) {

    case actionsTypes.SET_USER_DETAILS:
    case actionsTypes.GET_USER_DETAILS_SUCCESS:
        return setUserDetails(state, action);

    case actionsTypes.GET_USER_DETAILS_REQUEST:
        return update(state, {
            isFetchingUser: { $set: true }
        });

    case actionsTypes.GET_USER_DETAILS_FAILURE:
        return update(state, {
            isFetchingUser: { $set: false },
            error: { $set: action.error }
        });

    case actionsTypes.TOGGLE_COOKIE_MESSAGE:
        return update(state, {
            cookieMessage: { $set: false }
        });

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
