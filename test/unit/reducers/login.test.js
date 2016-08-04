import test from 'tape';
import { login as loginState } from '../../utils/reducer-fixtures';
import { authenticateUserError as error } from '../../utils/action-fixtures';
import reducer from '../../../src/js/reducers/login';
import deepFreeze from '../../utils/deepFreeze';


test('AUTHENTICATE_USER_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(loginState);

    const action = {
        type: 'AUTHENTICATE_USER_REQUEST',
    };
    const expected = {
        email: "",
        password: "",
        isAuthenticating: true,
        userIsAuthenticated: undefined,
        error: undefined
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('AUTHENTICATE_USER_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(loginState);
    const data = true;
    const action = {
        type: 'AUTHENTICATE_USER_SUCCESS',
        data
    };
    const expected = {
        email: "",
        password: "",
        isAuthenticating: false,
        userIsAuthenticated: data,
        error: undefined
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('AUTHENTICATE_USER_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(loginState);

    const action = {
        type: 'AUTHENTICATE_USER_FAILURE',
        error
    };
    const expected = {
        email: "",
        password: "",
        isAuthenticating: false,
        userIsAuthenticated: undefined,
        error: error
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});



test('UPDATE_EMAIL works when user enters a value', (t) => {

    t.plan(1);

    const initialState = deepFreeze(loginState);

    const action = {
        type: 'UPDATE_EMAIL',
        value: 'test@city.ac.uk'
    };

    const expected = {
        email: 'test@city.ac.uk',
        password: "",
        isAuthenticating: false,
        error: undefined,
        userIsAuthenticated: undefined
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('UPDATE_PASSWORD works when user enters a value', (t) => {

    t.plan(1);

    const initialState = deepFreeze(loginState);

    const action = {
        type: 'UPDATE_PASSWORD',
        value: 'testpassword'
    };

    const expected = {
        email: "",
        password: 'testpassword',
        isAuthenticating: false,
        error: undefined,
        userIsAuthenticated: undefined
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});
