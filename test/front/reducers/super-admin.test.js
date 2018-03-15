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
        lecturers: data.lecturers,
        clients: data.clients
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

test('DELETE_USER_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(superAdminState);

    const action = {
        type: 'DELETE_USER_REQUEST',
    };
    const expected = {
        ...superAdminState,
        isDeletingUser: true
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('DELETE_USER_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(superAdminState);

    const action = {
        type: 'DELETE_USER_SUCCESS'
    };
    const expected = {
        ...superAdminState
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('DELETE_USER_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(superAdminState);

    const action = {
        type: 'DELETE_USER_FAILURE',
        error
    };
    const expected = {
        ...superAdminState,
        error
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('DOWNLOAD_DATA_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(superAdminState);

    const action = {
        type: 'DOWNLOAD_DATA_REQUEST',
    };
    const expected = {
        ...superAdminState,
        isDownloadingData: true
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('DOWNLOAD_DATA_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(superAdminState);

    const action = {
        type: 'DOWNLOAD_DATA_SUCCESS'
    };
    const expected = {
        ...superAdminState
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('DOWNLOAD_DATA_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(superAdminState);

    const action = {
        type: 'DOWNLOAD_DATA_FAILURE',
        error
    };
    const expected = {
        ...superAdminState,
        error
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('UPDATE_INPUT works when user enters a value', (t) => {

    t.plan(1);

    const initialState = deepFreeze(superAdminState);

    const email = 'test@city.ac.uk';
    const action = {
        type: 'UPDATE_INPUT',
        value: email,
        name: 'email'
    };

    const expected = { ...superAdminState, manageClient: { ...superAdminState.manageClient, email } };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('SUBMIT_CLIENT_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(superAdminState);

    const action = {
        type: 'SUBMIT_CLIENT_REQUEST',
    };
    const expected = {
        ...superAdminState,
        isSavingClient: true
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('SUBMIT_CLIENT_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(superAdminState);

    const action = {
        type: 'SUBMIT_CLIENT_SUCCESS'
    };
    const expected = {
        ...superAdminState
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('SUBMIT_CLIENT_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(superAdminState);

    const action = {
        type: 'SUBMIT_CLIENT_FAILURE',
        error
    };
    const expected = {
        ...superAdminState,
        error
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('DISPLAY_ERROR works', (t) => {
    t.plan(1);
    const initialState = deepFreeze(superAdminState);
    const error = {
        message: 'something has gone wrong'
    };
    const action = {
        type: 'DISPLAY_ERROR',
        error
    };
    const expected = Object.assign({}, superAdminState, { error });
    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('EDIT_CLIENT works', (t) => {
    t.plan(1);
    const initialState = deepFreeze(superAdminState);
    const client = {
        name: 'name',
        email: 'email',
        institution: 'institution',
        department: 'department',
        accountType: 'accountType',
        paid: 'paid',
        code: null
    };
    const action = {
        type: 'EDIT_CLIENT',
        client
    };
    const expected = Object.assign({}, superAdminState, { manageClient: client, isEditingClient: true });
    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('CLEAR_CLIENT_FORM works', (t) => {
    t.plan(1);
    const initialState = deepFreeze(superAdminState);
    const action = {
        type: 'CLEAR_CLIENT_FORM'
    };

    const expected = Object.assign({}, superAdminState);
    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

