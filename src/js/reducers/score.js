import update from 'react-addons-update';
import * as actionsTypes from '../actions/score';

const initialState = {
    score: undefined,
    isFetchingScore: false,
    error: undefined
};

export default function (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.GET_QUIZ_SCORE_REQUEST:
        return update(state, {
            isFetchingScore: { $set: true }
        });

    case actionsTypes.GET_QUIZ_SCORE_SUCCESS:
        return update(state, {
            isFetchingScore: { $set: false },
            score: { $set: action.score }
        });

    case actionsTypes.GET_QUIZ_SCORE_FAILURE:
        return update(state, {
            isFetchingScore: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;
    }
}
