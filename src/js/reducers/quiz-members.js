import update from 'react-addons-update';
import * as actionsTypes from '../actions/quiz-members';

const initialState = {
    members: undefined,
    isFetchingQuizMembers: false,
    error: undefined
};

export default function quizMembers (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.GET_QUIZ_MEMBERS_REQUEST:
        return update(state, {
            isFetchingQuizMembers: { $set: true }
        });

    case actionsTypes.GET_QUIZ_MEMBERS_SUCCESS:
        return update(state, {
            isFetchingQuizMembers: { $set: false },
            members: { $set: action.data },
        });

    case actionsTypes.GET_QUIZ_MEMBERS_FAILURE:
        return update(state, {
            isFetchingQuizMembers: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;
    }

}
