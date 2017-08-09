import test from 'tape';
import { superAdminDashboardError as error } from '../../utils/action-fixtures';
import { superAdminDashboardData as data } from '../../utils/data-fixtures';
import { initialState as superAdminState, superAdmin as reducer } from '../../../src/js/reducers/super-admin';
import deepFreeze from '../../utils/deepFreeze';


test('GET_SUPER_ADMIN_DASHBOARD_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(superAdminState);

    const action = {
        type: 'GET_SUPER_ADMIN_DASHBOARD_REQUEST',
    };
    const expected = {
        ...superAdminState,
        isFetchingSuperAdminDashboard: true
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('GET_SUPER_ADMIN_DASHBOARD_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(superAdminState);

    const action = {
        type: 'GET_SUPER_ADMIN_DASHBOARD_SUCCESS',
        data
    };
    const expected = {
        ...superAdminState,
        isFetchingSuperAdminDashboard: false,
        students: data.students,
        lecturers: data.lecturers
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('GET_SUPER_ADMIN_DASHBOARD_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(superAdminState);

    const action = {
        type: 'GET_SUPER_ADMIN_DASHBOARD_FAILURE',
        error
    };
    const expected = {
        ...superAdminState,
        error
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});
