import test from 'tape';
import { initialState as userState, user as reducer } from '../../../src/js/reducers/user';
import { userDetails as data } from '../../utils/reducer-fixtures';
import deepFreeze from '../../utils/deepFreeze';
import { getUserDetailsError as error } from '../../utils/action-fixtures';


test('SET_USER_DETAILS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(userState);

    const action = {
        type: 'SET_USER_DETAILS',
        data
    };

    const expected = Object.assign({}, userState, data);

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('TOGGLE_COOKIE_MESSAGE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(userState);

    const action = {
        type: 'TOGGLE_COOKIE_MESSAGE'
    };

    const expected = Object.assign({}, userState, { isCookieAccepted: false });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

// -----
// GET_USER_DETAILS
// -----


test('GET_USER_DETAILS_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(userState);

    const action = {
        type: 'GET_USER_DETAILS_REQUEST',
    };

    const expected = Object.assign({}, userState, { isFetchingUser: true });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('GET_USER_DETAILS_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(userState);
    const action = {
        type: 'GET_USER_DETAILS_SUCCESS',
        data
    };

    const expected = Object.assign({}, userState, data);

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('GET_USER_DETAILS_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(userState);

    const action = {
        type: 'GET_USER_DETAILS_FAILURE',
        error
    };

    const expected = Object.assign({}, userState, { error });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});
