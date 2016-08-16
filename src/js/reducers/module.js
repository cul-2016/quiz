import update from 'react-addons-update';
import * as actionsTypes from '../actions/module';

const initialState = {
    module: undefined,
    quizzes: undefined,
    isFetchingModule: false,
    isFetchingModuleMembers: false,
    error: undefined,
    isQuizOpen: false,
    users: undefined,
    isRemovingMember: false
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

    case actionsTypes.GET_MODULE_MEMBERS_REQUEST:
        return update(state, {
            isFetchingModuleMembers: { $set: true }
        });

    case actionsTypes.GET_MODULE_MEMBERS_SUCCESS:
        return update(state, {
            isFetchingModuleMembers: { $set: false },
            users: { $set: action.data },
        });

    case actionsTypes.GET_MODULE_MEMBERS_FAILURE:
        return update(state, {
            isFetchingModuleMembers: { $set: false },
            error: { $set: action.error }
        });

    case actionsTypes.REMOVE_MODULE_MEMBER_REQUEST:
        return update(state, {
            isRemovingMember: { $set: true }
        });

    case actionsTypes.REMOVE_MODULE_MEMBER_SUCCESS:
        return update(state, {
            isRemovingMember: { $set: false }
        });

    case actionsTypes.REMOVE_MODULE_MEMBER_FAILURE:
        return update(state, {
            isRemovingMember: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;
    }
}
