import update from 'react-addons-update';
import * as actionsTypes from '../actions/feedback';


export const initialState = {
    ranking: undefined,
    quizzes: [],
    participation: undefined,
    isFetchingFeedback: false,
    error: undefined
};

export function feedback (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.GET_FEEDBACK_REQUEST:
        return update(state, {
            isFetchingFeedback: { $set: true }
        });

    case actionsTypes.GET_FEEDBACK_SUCCESS:
        return update(state, {
            isFetchingFeedback: { $set: false },
            ranking: { $set: action.data.ranking },
            quizzes: { $set: action.data.quizzes },
            participation: { $set: action.data.participation },
        });

    case actionsTypes.GET_FEEDBACK_FAILURE:
        return update(state, {
            isFetchingFeedback: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;
    }
}
