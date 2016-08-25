import update from 'react-addons-update'; // eslint-disable-line
import * as actionsTypes from '../actions/leaderboard'; // eslint-disable-line


const initialState = {
    leaderboard: [],
    error: undefined
};

export default function quizMembers (state = initialState, action) {

    switch (action.type) {

    default:
        return state;
    }
}
