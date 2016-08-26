import test from 'tape';
import { leaderboard as leaderboardState } from '../../utils/reducer-fixtures';
import { getLeaderboardError as error } from '../../utils/action-fixtures';
import reducer from '../../../src/js/reducers/leaderboard';
import { leaderboard } from '../../utils/data-fixtures';
import deepFreeze from '../../utils/deepFreeze';

//
// GET LEADERBOARD
//

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
        leaderboard
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, leaderboardState, { isFetchingLeaderboard: false }, { leaderboard });

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
