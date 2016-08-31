import update from 'react-addons-update';
import * as actionsTypes from '../actions/result';

export const initialState = {
    score: 0,
    newTrophyState: [],
    isFetchingResult: false,
    error: undefined
};

export function result (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.GET_QUIZ_RESULT_REQUEST:
        return update(state, {
            isFetchingResult: { $set: true }
        });

    case actionsTypes.GET_QUIZ_RESULT_SUCCESS:
        
        return update(state, {
            isFetchingResult: { $set: false },
            score: { $set: action.data.score.raw },
            newTrophyState: { $set: action.data.newTrophyState }
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
