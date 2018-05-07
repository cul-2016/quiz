import test from 'tape';
import { groupAdminDashboardError as error } from '../../utils/action-fixtures';
import { groupAdminDashboardData as data } from '../../utils/data-fixtures';
import { initialState as groupAdminState, groupAdmin as reducer } from '../../../src/js/reducers/group-admin';
import deepFreeze from '../../utils/deepFreeze';


test('GET_GROUP_ADMIN_DASHBOARD_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(groupAdminState);

    const action = {
        type: 'GET_GROUP_ADMIN_DASHBOARD_REQUEST',
    };
    const expected = {
        ...groupAdminState,
        isFetchingGroupAdminDashboard: true
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('GET_GROUP_ADMIN_DASHBOARD_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(groupAdminState);

    const action = {
        type: 'GET_GROUP_ADMIN_DASHBOARD_SUCCESS',
        data
    };
    const expected = {
        ...groupAdminState,
        isFetchingGroupAdminDashboard: false,
        lecturers: data.lecturers,
        user_count: data.userAccountLimitInformation.count,
        user_limit: data.userAccountLimitInformation.user_limit
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('GET_GROUP_ADMIN_DASHBOARD_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(groupAdminState);

    const action = {
        type: 'GET_GROUP_ADMIN_DASHBOARD_FAILURE',
        error
    };
    const expected = {
        ...groupAdminState,
        error
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('UPDATE_USER_IS_ACTIVE_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(groupAdminState);

    const action = {
        type: 'UPDATE_USER_IS_ACTIVE_REQUEST',
    };
    const expected = {
        ...groupAdminState,
        isUpdatingUser: true
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('UPDATE_USER_IS_ACTIVE_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(groupAdminState);

    const action = {
        type: 'UPDATE_USER_IS_ACTIVE_SUCCESS'
    };
    const expected = {
        ...groupAdminState
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('UPDATE_USER_IS_ACTIVE_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(groupAdminState);

    const action = {
        type: 'UPDATE_USER_IS_ACTIVE_FAILURE',
        error
    };
    const expected = {
        ...groupAdminState,
        error
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});
