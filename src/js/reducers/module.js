import update from 'react-addons-update';
import * as actionsTypes from '../actions/module';

const initialState = {
    module: undefined,
    quizzes: undefined,
    isFetchingModule: false,
    isFetchingModuleUsers: false,
    error: undefined,
    isQuizOpen: false,
    users: undefined,
    isRemovingUser: false
};

export default function module (state = initialState, action ) {

    switch (action.type) {

    case actionsTypes.OPEN_QUIZ:
        return update(state, {
            isQuizOpen: { $set: true }
        });

    case actionsTypes.CLOSE_QUIZ:
        return update(state, {
            isQuizOpen: { $set: false }
        });

    case actionsTypes.GET_MODULE_REQUEST:
        return update(state, {
            isFetchingModule: { $set: true }
        });

    case actionsTypes.GET_MODULE_SUCCESS:
        return update(state, {
            isFetchingModule: { $set: false },
            module: { $set: action.data.module },
            quizzes: { $set: action.data.quizzes }
        });

    case actionsTypes.GET_MODULE_FAILURE:
        return update(state, {
            isFetchingModule: { $set: false },
            error: { $set: action.error }
        });

    case actionsTypes.GET_MODULE_USERS_REQUEST:
        return update(state, {
            isFetchingModuleUsers: { $set: true }
        });

    case actionsTypes.GET_MODULE_USERS_SUCCESS:
        return update(state, {
            isFetchingModuleUsers: { $set: false },
            users: { $set: action.data },
        });

    case actionsTypes.GET_MODULE_USERS_FAILURE:
        return update(state, {
            isFetchingModuleUsers: { $set: false },
            error: { $set: action.error }
        });

    case actionsTypes.REMOVE_USER_FROM_MODULE_REQUEST:
        return update(state, {
            isRemovingUser: { $set: true }
        });

    case actionsTypes.REMOVE_USER_FROM_MODULE_SUCCESS:
        return update(state, {
            isRemovingUser: { $set: false }
        });

    case actionsTypes.REMOVE_USER_FROM_MODULE_FAILURE:
        return update(state, {
            isRemovingUser: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;
    }
}
