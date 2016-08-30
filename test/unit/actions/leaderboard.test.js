import test from 'tape';
import * as actions from '../../../src/js/actions/leaderboard';
import createThunk from '../../utils/mockThunk';
import deepFreeze from '../../utils/deepFreeze';
import { leaderboard } from '../../utils/data-fixtures';
import { getLeaderboardError as error } from '../../utils/action-fixtures';

test('getLeaderboard async action creator returns expected action', (t) => {

    t.plan(1);
    let result;
    let module_id = 'TEST';
    const { dispatch, queue } = createThunk();
    dispatch(actions.getLeaderboard(module_id));

    [{ ...result }] = queue;

    const expected = {
        type: actions.GET_LEADERBOARD_REQUEST
    };
    t.deepEqual(result, expected);
});

test('getLeaderboardRequest creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GET_LEADERBOARD_REQUEST
    };

    const actual = deepFreeze(actions.getLeaderboardRequest());
    t.deepEqual(actual, expected);
});

test('getLeaderboardSuccess creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GET_LEADERBOARD_SUCCESS,
        leaderboard
    };

    const actual = deepFreeze(actions.getLeaderboardSuccess(leaderboard));
    t.deepEqual(actual, expected);
});

test('getLeaderboardFailure creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GET_LEADERBOARD_FAILURE,
        error
    };

    const actual = deepFreeze(actions.getLeaderboardFailure(error));
    t.deepEqual(actual, expected);
});
