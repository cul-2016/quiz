import update from 'react-addons-update';
import * as actionsTypes from '../actions/leaderboard';


const initialState = {
    leaderboard: [],
    isFetchingLeaderboard: false,
    error: undefined
};

export default function quizMembers (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.GET_LEADERBOARD_REQUEST:
        return update(state, {
            isFetchingLeaderboard: { $set: true }
        });

    case actionsTypes.GET_LEADERBOARD_SUCCESS:

        return update(state, {
            isFetchingLeaderboard: { $set: false },
            leaderboard: { $set: action.leaderboard }
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
