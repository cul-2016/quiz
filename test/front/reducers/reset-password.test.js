import test from 'tape';
import {
    initialState as resetPasswordState,
    resetPassword as reducer
} from '../../../src/js/reducers/reset-password';
import deepFreeze from '../../utils/deepFreeze';


test('UPDATE_EMAIL works when user enters a value', (t) => {

    t.plan(1);

    const initialState = deepFreeze(resetPasswordState);

    const email = 'test@city.ac.uk';
    const action = {
        type: 'UPDATE_EMAIL',
        value: email
    };

    const expected = Object.assign({}, resetPasswordState, { email });


    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('UPDATE_PASSWORD works when user enters a value', (t) => {

    t.plan(1);

    const initialState = deepFreeze(resetPasswordState);

    const password = 'testpassword';
    const action = {
        type: 'UPDATE_PASSWORD',
        value: password
    };

    const expected = Object.assign({}, resetPasswordState, { password });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('UPDATE_CONFIRMED_PASSWORD works when user enters a value', (t) => {

    t.plan(1);

    const initialState = deepFreeze(resetPasswordState);

    const confirmedPassword = 'testpassword';
    const action = {
        type: 'UPDATE_CONFIRMED_PASSWORD',
        value: confirmedPassword
    };

    const expected = Object.assign({}, resetPasswordState, { confirmedPassword });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('RESET_PASSWORD_REQUEST works when a user sends of a request', (t) => {

    t.plan(1);

    const initialState = deepFreeze(resetPasswordState);

    const action = {
        type: 'RESET_PASSWORD_REQUEST',
        value: true
    };

    const expected = Object.assign({}, resetPasswordState, { isRequesting: true });
    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('RESET_PASSWORD_SUCCESS works when a user sends of a request', (t) => {

    t.plan(1);

    const initialState = deepFreeze(resetPasswordState);

    const action = {
        type: 'RESET_PASSWORD_SUCCESS',
        value: false
    };

    const expected = Object.assign({}, resetPasswordState);
    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('SUBMIT_NEW_PASSWORD_REQUEST works when a user sends of a request', (t) => {

    t.plan(1);

    const initialState = deepFreeze(resetPasswordState);

    const action = {
        type: 'SUBMIT_NEW_PASSWORD_REQUEST',
        value: true
    };

    const expected = Object.assign({}, resetPasswordState, { isRequesting: true });
    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('SUBMIT_NEW_PASSWORD_SUCCESS works when a user sends of a request', (t) => {

    t.plan(1);

    const initialState = deepFreeze(resetPasswordState);

    const action = {
        type: 'SUBMIT_NEW_PASSWORD_SUCCESS',
    };

    const expected = Object.assign({}, resetPasswordState);
    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('RESET_PASSWORD_FAILURE works when a user sends of a request', (t) => {

    t.plan(1);

    const initialState = deepFreeze(resetPasswordState);
    const customError = 'sorry something went wrong!';
    const action = {
        type: 'RESET_PASSWORD_FAILURE',
        error: customError,
        value: false
    };

    const expected = Object.assign({}, resetPasswordState, { error: customError });
    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('SUBMIT_NEW_PASSWORD_FAILURE works when a user sends of a request', (t) => {

    t.plan(1);

    const initialState = deepFreeze(resetPasswordState);
    const customError = 'sorry something went wrong!';
    const action = {
        type: 'SUBMIT_NEW_PASSWORD_FAILURE',
        error: customError,
        value: false
    };

    const expected = Object.assign({}, resetPasswordState, { error: customError });
    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});
