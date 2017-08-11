import test from 'tape';
import { register as registerState } from '../../utils/reducer-fixtures';
import { registeringUserError as error } from '../../utils/action-fixtures';
import reducer from '../../../src/js/reducers/register';
import deepFreeze from '../../utils/deepFreeze';

test('UPDATE_INPUT_FIELD works', (t) => {
    t.plan(1);
    const inputKey = 'email';
    const value = 'test';
    const initialState = deepFreeze(registerState);
    const action = {
        type: 'UPDATE_INPUT_FIELD',
        value,
        inputKey
    };
    const expected = {
        email: "test",
        username: "",
        password: "",
        isRegistering: false,
        error: undefined,
        userIsRegistered: undefined,
        userExists: false
    };
    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

// -----
// REGISTERING USER
// -----

test('REGISTERING_USER_REQUEST works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(registerState);
    const action = {
        type: 'REGISTERING_USER_REQUEST'
    };
    const expected = {
        email: "",
        username: "",
        password: "",
        isRegistering: true,
        error: undefined,
        userIsRegistered: undefined,
        userExists: false
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('REGISTERING_USER_SUCCESS works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(registerState);
    const data = true;
    const action = {
        type: 'REGISTERING_USER_SUCCESS',
        data
    };
    const expected = {
        email: "",
        username: "",
        password: "",
        isRegistering: false,
        error: undefined,
        userIsRegistered: true,
        userExists: false
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('REGISTERING_USER_FAILURE works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(registerState);
    const action = {
        type: 'REGISTERING_USER_FAILURE',
        error
    };
    const expected = {
        email: "",
        username: "",
        password: "",
        isRegistering: false,
        error: error,
        userIsRegistered: undefined,
        userExists: false
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('TOGGLE_TC_AGREED works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(registerState);
    const action = {
        type: 'TOGGLE_TC_AGREED',
    };
    const expected = { ...initialState, tcAgreed: true };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});
