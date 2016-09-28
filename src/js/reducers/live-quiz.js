import update from 'react-addons-update';
import * as actionsTypes from '../actions/live-quiz';


const initialState = {
    error: undefined,
    isFetchingQuizQuestions: false,
    isSavingResponse: false,
    isResponseSubmitted: false,
    quiz_id: undefined,
    name: undefined,
    questions: undefined,
    response: undefined,
    nextQuestionIndex: 0,
    isQuizStarted: false,
    isEndingQuiz: false,
    isAbortingQuiz: false,
    interval_id: undefined,
    numParticipants: 0
};

export default function liveQuiz (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.GET_QUIZ_QUESTIONS_REQUEST:
        return update(state, {
            isFetchingQuizQuestions: { $set: true }
        });

    case actionsTypes.GET_QUIZ_QUESTIONS_SUCCESS:

        return update(state, {
            isFetchingQuizQuestions: { $set: false },
            questions: { $set: action.questions }
        });


    case actionsTypes.GET_QUIZ_QUESTIONS_FAILURE:
        return update(state, {
            isFetchingQuizQuestions: { $set: false },
            error: { $set: action.error }
        });

    case actionsTypes.SAVE_RESPONSE_REQUEST:
        return update(state, {
            isSavingResponse: { $set: true }
        });

    case actionsTypes.SAVE_RESPONSE_SUCCESS:
        return update(state, {
            isSavingResponse: { $set: false },
            isResponseSubmitted: { $set: true }
        });

    case actionsTypes.SAVE_RESPONSE_FAILURE:
        return update(state, {
            isSavingResponse: { $set: false },
            error: { $set: action.error }
        });

    case actionsTypes.SET_QUIZ_DETAILS:
        return update(state, {
            quiz_id: { $set: action.quiz_id },
            name: { $set: action.name }
        });

    case actionsTypes.START_QUIZ:
        return update(state, {
            isQuizStarted: { $set: true }
        });

    case actionsTypes.END_QUIZ_REQUEST:
        return update(state, {
            isEndingQuiz: { $set: true }
        });

    case actionsTypes.END_QUIZ_SUCCESS:
        return initialState;

    case actionsTypes.END_QUIZ_FAILURE:
        return update(state, {
            isEndingQuiz: { $set: false },
            error: { $set: action.error }
        });

    case actionsTypes.ABORT_QUIZ_REQUEST:
        return update(state, {
            isAbortingQuiz: { $set: true }
        });

    case actionsTypes.ABORT_QUIZ_SUCCESS:
        return initialState;

    case actionsTypes.ABORT_QUIZ_FAILURE:
        return update(state, {
            isAbortingQuiz: { $set: false },
            error: { $set: action.error }
        });

    case actionsTypes.SET_INTERVAL_ID:
        return update(state, {
            interval_id: { $set: action.interval_id }
        });

    case actionsTypes.SET_NEXT_QUESTION:
        return update(state, {
            questions: { $set: [action.nextQuestion] },
            response: { $set: undefined }
        });

    case actionsTypes.GO_TO_NEXT_QUESTION:
        return update(state, {
            nextQuestionIndex: { $set: state.nextQuestionIndex + 1 }
        });

    case actionsTypes.GO_TO_PREVIOUS_QUESTION:
        return update(state, {
            nextQuestionIndex: { $set: state.nextQuestionIndex - 1 }
        });

    case actionsTypes.SET_RESPONSE:
        return update(state, {
            response: { $set: action.data }
        });

    case actionsTypes.TOGGLE_MESSAGE_VISIBILITY:
        return update(state, {
            isResponseSubmitted: { $set: false }
        });

    case actionsTypes.UPDATE_NUM_PARTICIPANTS:
        return update(state, {
            numParticipants: { $set: action.numParticipants }
        });

    default:
        return state;
    }
}
