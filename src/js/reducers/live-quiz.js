import update from 'react-addons-update';
import * as actionsTypes from '../actions/live-quiz';

const initialState = {
    quiz_id: undefined,
    question: undefined,
    response: undefined
};

export default function liveQuiz (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.SET_QUIZ_ID:
        return update(state, {
            quiz_id: { $set: action.quiz_id }
        });

    default:
        return state;
    }
}
