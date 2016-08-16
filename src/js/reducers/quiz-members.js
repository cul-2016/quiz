import update from 'react-addons-update';
import * as actionsTypes from '../actions/quiz-members';

const initialState = {
    members: undefined,
    isFetchingQuizMembers: false,
    error: undefined,
    isEditingScore: false
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

    case actionsTypes.EDIT_SCORE_REQUEST:
        return update(state, {
            isEditingScore: { $set: true }
        });

    case actionsTypes.EDIT_SCORE_SUCCESS:
        return update(state, {
            isEditingScore: { $set: false }
        });

    case actionsTypes.EDIT_SCORE_FAILURE:
        return update(state, {
            isEditingScore: { $set: false },
            error: { $set: action.error }
        });

    case actionsTypes.SCORE_CHANGE:
        console.log('you are in score chage');
        return handleScoreChange(state, action);

    default:
        return state;
    }
}

export const handleScoreChange = (state, action) => {
    const newObj = Object.assign({}, state.members[action.member_key], { score: action.score });
    return update(state, {
        members: { $splice: [[action.member_key, 1, newObj]] }
    });
};
