import update from 'react-addons-update';
import * as actionsTypes from '../actions/module';

const initialState = {
    module: undefined,
    quizzes: undefined,
    isFetchingModule: false,
    error: undefined,
    isQuizOpen: false,
    users: undefined
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

    default:
        return state;
    }
}
