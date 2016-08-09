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
    isQuizStarted: false
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
