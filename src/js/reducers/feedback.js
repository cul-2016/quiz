import update from 'react-addons-update';
import * as actionsTypes from '../actions/feedback';
import feedbackQuotes from '../lib/feedback.json';


export const initialState = {
    feedback: {
        90: feedbackQuotes.top10,
        75: feedbackQuotes.top11to25,
        50: feedbackQuotes.top25to50,
        10: feedbackQuotes.top51to90,
        0: feedbackQuotes.top91to100
    },
    quizzesCompleted: undefined,
    overallScore: undefined,
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
            quizzesCompleted: { $set: action.data.quizzesCompleted },
            overallScore: { $set: action.data.overallScore }
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
