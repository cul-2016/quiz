import test from 'tape';
import { user as userState } from '../../utils/reducer-fixtures';
import { userDetails as data } from '../../utils/reducer-fixtures';
import reducer from '../../../src/js/reducers/user';
import deepFreeze from '../../utils/deepFreeze';
import { getUserDetailsError as error } from '../../utils/action-fixtures';


test('SET_USER_DETAILS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(userState);

    const action = {
        type: 'SET_USER_DETAILS',
        data
    };

    const expected = {
        user_id: 1,
        email: 'test@test.com',
        username: 'test',
        is_lecturer: true,
        isFetchingUser: false,
        error: undefined
    };

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
    const expected = {
        user_id: undefined,
        email: undefined,
        username: undefined,
        is_lecturer: undefined,
        isFetchingUser: true,
        error: undefined
    };

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
    const expected = {
        user_id: 1,
        email: 'test@test.com',
        username: 'test',
        is_lecturer: true,
        isFetchingUser: false,
        error: undefined
    };
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
    const expected = {
        user_id: undefined,
        email: undefined,
        username: undefined,
        is_lecturer: undefined,
        isFetchingUser: false,
        error: error
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});
