import test from 'tape';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/register';
import deepFreeze from '../../utils/deepFreeze';
import { registeringUserError as error } from './action-fixtures';

test('updateInputField action creator returns expected action', (t) => {

    t.plan(1);
    const value = 'emailaddress';
    const inputKey = 'email';

    const expected = {
        type: actions.UPDATE_INPUT_FIELD,
        value,
        inputKey
    }

    const actual2 = deepFreeze(actions.updateInputField(inputKey, value));
    t.deepEqual(actual2, expected);
})

test('UserExists action creator returns expected action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.USER_EXISTS
    }
    const actual = deepFreeze(actions.userExists());
    t.deepEqual(actual, expected);
})

// -----
// REGISTERING USER
// -----

test('registeringUser async action creator returns expected action', (t) => {

    t.plan(1);
    let email = 'test@test.com';
    let name = 'testing';
    let password = 'testing';
    let is_lecturer = true;
    let actual;
    const { dispatch, queue } = createThunk();
    dispatch(actions.registeringUser(email, name, password, is_lecturer));

    [{ ...actual }] = queue;

    const expected = {
        type: actions.REGISTERING_USER_REQUEST,
    };
    t.deepEqual(actual, expected);
});

test('registeringUserRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.REGISTERING_USER_REQUEST,
    };

    const actual2 = deepFreeze(actions.registeringUserRequest());
    t.deepEqual(actual2, expected);
});

test('registeringUserSuccess creates the correct action', (t) => {

    t.plan(1);
    const data = true;
    const expected = {
        type: actions.REGISTERING_USER_SUCCESS,
        data
    };

    const actual2 = deepFreeze(actions.registeringUserSuccess(data));
    t.deepEqual(actual2, expected);
});

test('registeringUserFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.REGISTERING_USER_FAILURE,
        error
    };
    const actual = deepFreeze(actions.registeringUserFailure(error));
    t.deepEqual(actual, expected);
});
