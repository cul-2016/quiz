import update from 'react-addons-update';
import * as actionsTypes from '../actions/review';

const initialState = {
    error: undefined,
    isFetchingReview: false,
    questions: [],
    currentQuizIndex: 0,
    isAnswerShowing: false,
};

export default function review (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.GET_QUIZ_REVIEW_REQUEST:
        return update(state, {
            isFetchingReview: { $set: true }
        });

    case actionsTypes.GET_QUIZ_REVIEW_SUCCESS:
        return update(state, {
            isFetchingReview: { $set: false },
            questions: { $set: action.questions }
        });

    case actionsTypes.GET_QUIZ_REVIEW_FAILURE:
        return update(state, {
            isFetchingReview: { $set: false },
            error: { $set: action.error }
        });

    case actionsTypes.FLIP_IS_ANSWER_SHOWING:
        return update(state, {
            isAnswerShowing: { $set: !state.isAnswerShowing }
        });

    case actionsTypes.INCREMENT_CURRENT_QUIZ_INDEX:
        return update(state, {
            currentQuizIndex: { $set: state.currentQuizIndex + 1 }
        });

    case actionsTypes.GO_BACK:
        return update(state, {
            currentQuizIndex: { $set: state.currentQuizIndex - 1 },
            isAnswerShowing: { $set: true }
        });

    case actionsTypes.CLEAR_REVIEW_STATE:
        return initialState;

    default:
        return state;
    }
}
