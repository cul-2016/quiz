import test from 'tape';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/user';
import deepFreeze from '../../utils/deepFreeze';
import { userDetails as data } from '../../utils/data-fixtures';
import { getUserDetailsError as error } from '../../utils/action-fixtures';

test('setUserDetails creates the correct action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.SET_USER_DETAILS,
        data
    };

    const actual2 = deepFreeze(actions.setUserDetails(data));
    t.deepEqual(actual2, expected);
});

// -----
// GET_USER_DETAILS
// -----


test('getUserDetails async action creator returns expected action', (t) => {

    t.plan(1);

    let user_id = 1;
    let actual;
    const { dispatch, queue } = createThunk();
    dispatch(actions.getUserDetails(user_id));

    [{ ...actual }] = queue;

    const expected = {
        type: actions.GET_USER_DETAILS_REQUEST,
    };
    t.deepEqual(actual, expected);
});

test('getUserRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_USER_DETAILS_REQUEST,
    };

    const actual2 = deepFreeze(actions.getUserDetailsRequest());
    t.deepEqual(actual2, expected);
});

test('getUserDetailsSuccess creates the correct action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.GET_USER_DETAILS_SUCCESS,
        data
    };

    const actual2 = deepFreeze(actions.getUserDetailsSuccess(data));
    t.deepEqual(actual2, expected);
});

test('getUserDetailsFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_USER_DETAILS_FAILURE,
        error
    };
    const actual = deepFreeze(actions.getUserDetailsFailure(error));
    t.deepEqual(actual, expected);
});
