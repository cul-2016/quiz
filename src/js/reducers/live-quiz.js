import update from 'react-addons-update';
import * as actionsTypes from '../actions/live-quiz';

const initialState = {
    quiz_id: 1,
    questions: [
        {
            question: 'capital of England',
            A: 'London',
            B: 'Tokyo',
            C: 'New York',
            D: 'Paris'
        },
        {
            question: 'capital of Japan',
            A: 'London',
            B: 'Tokyo',
            C: 'New York',
            D: 'Paris'
        },
        {
            question: 'capital of France',
            A: 'London',
            B: 'Tokyo',
            C: 'New York',
            D: 'Paris'
        }
    ],
    response: undefined,
    nextQuestionIndex: 0,
    isQuizStarted: false,
    interval_id: undefined
};

export default function liveQuiz (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.SET_QUIZ_ID:
        return update(state, {
            quiz_id: { $set: action.quiz_id }
        });

    case actionsTypes.START_QUIZ:
        return update(state, {
            isQuizStarted: { $set: true }
        });

    case actionsTypes.END_QUIZ:
        return update(state, {
            isQuizStarted: { $set: false }
        });

    case actionsTypes.NEXT_QUESTION:
        return update(state, {
            nextQuestionIndex: { $set: state.nextQuestionIndex + 1 }
        });

    case actionsTypes.PREVIOUS_QUESTION:
        return update(state, {
            nextQuestionIndex: { $set: state.nextQuestionIndex - 1 }
        });

    case actionsTypes.SAVE_INTERVAL_ID:
        return update(state, {
            interval_id: { $set: action.interval_id }
        });

    default:
        return state;
    }
}
