import update from 'react-addons-update';
import * as actionsTypes from '../actions/review-quiz';

const initialState = {
    error: undefined,
    isFetchingReviewQuiz: false,
    questions: undefined,
    currentQuizIndex: 0,
    isAnswerShowing: false,
};

export default function reviewQuiz (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.GET_QUIZ_REVIEW_REQUEST:
        return update(state, {
            isFetchingReviewQuiz: { $set: true }
        });

    case actionsTypes.GET_QUIZ_REVIEW_SUCCESS:
        return update(state, {
            isFetchingReviewQuiz: { $set: false },
            questions: { $set: action.questions }
        });

    case actionsTypes.GET_QUIZ_REVIEW_FAILURE:
        return update(state, {
            isFetchingReviewQuiz: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;
    }
}
