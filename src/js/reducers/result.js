import update from 'react-addons-update';
import * as actionsTypes from '../actions/result';

const initialState = {
    score: undefined,
    isFetchingResult: false,
    error: undefined
};

export default function result (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.GET_QUIZ_RESULT_REQUEST:
        return update(state, {
            isFetchingResult: { $set: true }
        });

    case actionsTypes.GET_QUIZ_RESULT_SUCCESS:
        return update(state, {
            isFetchingResult: { $set: false },
            score: { $set: action.data.score }
        });

    case actionsTypes.GET_QUIZ_RESULT_FAILURE:
        return update(state, {
            isFetchingResult: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;
    }
}
