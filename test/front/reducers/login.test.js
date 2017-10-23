import test from 'tape';
import * as states from '../../utils/reducer-fixtures';
import { authenticateUserError as error } from '../../utils/action-fixtures';
import {
    initialState as loginState,
    login as reducer
}  from '../../../src/js/reducers/login';
import { rootReducer, appReducer } from '../../../src/js/reducers/root-reducer';
import deepFreeze from '../../utils/deepFreeze';


test('UPDATE_EMAIL works when user enters a value', (t) => {

    t.plan(1);

    const initialState = deepFreeze(loginState);

    const email = 'test@city.ac.uk';
    const action = {
        type: 'UPDATE_EMAIL',
        value: email
    };

    const expected = Object.assign({}, loginState, { email });


    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('UPDATE_PASSWORD works when user enters a value', (t) => {

    t.plan(1);

    const initialState = deepFreeze(loginState);

    const password = 'testpassword';
    const action = {
        type: 'UPDATE_PASSWORD',
        value: password
    };

    const expected = Object.assign({}, loginState, { password });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('AUTHENTICATE_USER_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(loginState);

    const action = {
        type: 'AUTHENTICATE_USER_REQUEST',
    };

    const expected = Object.assign({}, loginState, { isAuthenticating: true });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('AUTHENTICATE_USER_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            loginState,
            { isAuthenticating: true }
        )
    );

    const data = true;
    const action = {
        type: 'AUTHENTICATE_USER_SUCCESS',
        data
    };
    const expected = Object.assign({}, loginState, { isAuthenticating: false });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('AUTHENTICATE_USER_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            loginState,
            { isAuthenticating: true }
        )
    );

    const action = {
        type: 'AUTHENTICATE_USER_FAILURE',
        error
    };

    const expected = Object.assign({}, loginState, { isAuthenticating: false }, { error });
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('LOGOUT works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign({},
            { user: Object.assign({}, states.user, { user_id: 10 }) },
            { login: Object.assign({}, loginState, { email: "testing@email.com" }) },
            { dashboard: Object.assign({}, states.dashboard, { data: 'some arbitrary data' }) }
        )
    );

    const action = {
        type: 'LOGOUT',
    };
    const expected = Object.assign({}, appReducer({}, 'LOGOUT'));
    const result = rootReducer(initialState, action);

    t.deepEqual(result, expected);
});

test('CLEAR_INITIAL_STATE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign({},
            { user: Object.assign({}, states.user, { user_id: 10 }) },
            { login: Object.assign({}, loginState, { email: "testing@email.com" }) },
            { dashboard: Object.assign({}, states.dashboard, { data: 'some arbitrary data' }) }
        )
    );

    const action = {
        type: 'CLEAR_INITIAL_STATE',
    };
    const expected = Object.assign({}, appReducer({}, 'CLEAR_INITIAL_STATE'));
    const result = rootReducer(initialState, action);

    t.deepEqual(result, expected);
});
