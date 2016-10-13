import update from 'react-addons-update';
import * as actionsTypes from '../actions/leaderboard';


export const initialState = {
    mainData: [],
    medalScores: [],
    quiz_id_list: [],
    isFetchingLeaderboard: false,
    error: undefined
};

export function leaderboard (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.GET_LEADERBOARD_REQUEST:
        return update(state, {
            isFetchingLeaderboard: { $set: true }
        });

    case actionsTypes.GET_LEADERBOARD_SUCCESS:

        return update(state, {
            isFetchingLeaderboard: { $set: false },
            mainData: { $set: action.mainData },
            medalScores: { $set: action.medalScores },
            quiz_id_list: { $set: action.quiz_id_list }
        });


    case actionsTypes.GET_LEADERBOARD_FAILURE:
        return update(state, {
            isFetchingLeaderboard: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;
    }
}
