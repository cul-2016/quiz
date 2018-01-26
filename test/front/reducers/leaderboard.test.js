import test from 'tape';
import { initialState as leaderboardState } from '../../../src/js/reducers/leaderboard';
import {
    getTotalScoresAndTrophiesData as mainData,
    getScoresForLeaderboardData as medalScores,
    getQuizIDListData as quiz_id_list
 } from '../../utils/data-fixtures';
import { getLeaderboardError as error } from '../../utils/action-fixtures';
import { leaderboard as reducer } from '../../../src/js/reducers/leaderboard';
import deepFreeze from '../../utils/deepFreeze';


test('GET_LEADERBOARD_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(leaderboardState);
    const action = {
        type: 'GET_LEADERBOARD_REQUEST',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, leaderboardState, { isFetchingLeaderboard: true });

    t.deepEqual(actual, expected);
});

test('GET_LEADERBOARD_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            leaderboardState,
            { isFetchingLeaderboard: true }
        )
    );
    const action = {
        type: 'GET_LEADERBOARD_SUCCESS',
        mainData,
        medalScores,
        quiz_id_list,
        uses_trophies: true,
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign(
        {},
        leaderboardState,
        { isFetchingLeaderboard: false },
        { mainData }, { medalScores }, { quiz_id_list }
    );

    t.deepEqual(actual, expected);
});

test('GET_LEADERBOARD_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            leaderboardState,
            { isFetchingLeaderboard: true }
        )
    );
    const action = {
        type: 'GET_LEADERBOARD_FAILURE',
        error
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, leaderboardState, { isFetchingLeaderboard: false }, { error });

    t.deepEqual(actual, expected);
});
