import test from 'tape';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/login';
import deepFreeze from '../../utils/deepFreeze';
import { authenticateUserError as error } from '../../utils/action-fixtures';




test('updateEmail creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.UPDATE_EMAIL,
        value: 'test@city.ac.uk'
    };
    const actual = deepFreeze(actions.updateEmail('test@city.ac.uk'));
    t.deepEqual(actual, expected);
});

test('updatePassword creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.UPDATE_PASSWORD,
        value: 'testpassword'
    };
    const actual = deepFreeze(actions.updatePassword('testpassword'));
    t.deepEqual(actual, expected);
});

test('authenticateUser async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();
    dispatch(actions.authenticateUser());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.AUTHENTICATE_USER_REQUEST,
    };
    t.deepEqual(actual, expected);
});

test('authenticateUserRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.AUTHENTICATE_USER_REQUEST,
    };

    const actual2 = deepFreeze(actions.authenticateUserRequest());
    t.deepEqual(actual2, expected);
});

test('authenticateUserSuccess creates the correct action', (t) => {

    t.plan(1);
    const data = true;
    const expected = {
        type: actions.AUTHENTICATE_USER_SUCCESS,
        data
    };

    const actual2 = deepFreeze(actions.authenticateUserSuccess(data));
    t.deepEqual(actual2, expected);
});

test('authenticateUserFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.AUTHENTICATE_USER_FAILURE,
        error
    };
    const actual = deepFreeze(actions.authenticateUserFailure(error));
    t.deepEqual(actual, expected);
});

test('logout creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.LOGOUT
    };

    const actual = deepFreeze(actions.logout());
    t.deepEqual(actual, expected);
});
