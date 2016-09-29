import test from 'tape';
import * as states from '../../utils/reducer-fixtures';
import { authenticateUserError as error } from '../../utils/action-fixtures';
import reducer from '../../../src/js/reducers/login';
import deepFreeze from '../../utils/deepFreeze';


test('UPDATE_EMAIL works when user enters a value', (t) => {

    t.plan(1);

    const initialState = deepFreeze(states.login);

    const email = 'test@city.ac.uk';
    const action = {
        type: 'UPDATE_EMAIL',
        value: email
    };

    const expected = Object.assign({}, states.login, { email });


    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('UPDATE_PASSWORD works when user enters a value', (t) => {

    t.plan(1);

    const initialState = deepFreeze(states.login);

    const password = 'testpassword';
    const action = {
        type: 'UPDATE_PASSWORD',
        value: password
    };

    const expected = Object.assign({}, states.login, { password });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('AUTHENTICATE_USER_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(states.login);

    const action = {
        type: 'AUTHENTICATE_USER_REQUEST',
    };

    const expected = Object.assign({}, states.login, { isAuthenticating: true });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('AUTHENTICATE_USER_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            states.login,
            { isAuthenticating: true }
        )
    );

    const data = true;
    const action = {
        type: 'AUTHENTICATE_USER_SUCCESS',
        data
    };
    const expected = Object.assign({}, states.login, { isAuthenticating: false });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('AUTHENTICATE_USER_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            states.login,
            { isAuthenticating: true }
        )
    );

    const action = {
        type: 'AUTHENTICATE_USER_FAILURE',
        error
    };

    const expected = Object.assign({}, states.login, { isAuthenticating: false }, { error });
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test.skip('LOGOUT works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign({},
            { user: Object.assign({}, states.user, { user_id: 10 }) },
            { login: Object.assign({}, states.login, { email: "testing@email.com" }) },
            { dashboard: Object.assign({}, states.dashboard, { data: 'some arbitrary data' }) }
        )
    );

    const action = {
        type: 'LOGOUT',
    };

    const expected = Object.assign({},
        { user: Object.assign({}, states.user) },
        { login: Object.assign({}, states.login) },
        { dashboard: Object.assign({}, states.dashboard) }
    );
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});
