import test from 'tape';
import sinon from 'sinon';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/super-admin';
import { superAdminDashboardData } from '../../utils/data-fixtures';
// modules that get stubbed with sinon
import axios from 'axios';

const createSandbox = sinon.sandbox.create;

test('getSuperAdminDashboard async action SUCCESS', (t) => {

    t.plan(2);

    const { dispatch, queue } = createThunk();
    const sandbox = createSandbox();

    const successPromise = new Promise(resolve => resolve(
        { data: superAdminDashboardData }
    ));
    sandbox.stub(axios, 'get').returns(successPromise);

    dispatch(actions.getSuperAdminDashboard());

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.GET_SUPER_ADMIN_DASHBOARD_REQUEST },
            'flags getSuperAdmin request'
        );
        t.deepEqual(
            queue.shift(),
            { type: actions.GET_SUPER_ADMIN_DASHBOARD_SUCCESS, data: superAdminDashboardData },
            'flags getSuperAdmin success'
        );
        sandbox.restore();
    }, 300);
});

test('getSuperAdminDashboard async action FAILURE', (t) => {

    t.plan(2);

    const { dispatch, queue } = createThunk();

    const customError = {
        response: { status: 500 },
        message: 'Sorry, something went wrong!',
        reducerState: 'superAdmin'
    };
    const axiosFailurePromise = Promise.reject(customError);
    const sandbox = createSandbox();
    sandbox.stub(axios, 'get').returns(axiosFailurePromise);

    dispatch(actions.getSuperAdminDashboard());
    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.GET_SUPER_ADMIN_DASHBOARD_REQUEST },
            'flags getSuperAdmin request'
        );
        t.deepEqual(
            queue.shift(),
            { type: actions.GET_SUPER_ADMIN_DASHBOARD_FAILURE, error: customError },
            'flags getSuperAdmin error'
        );
        sandbox.restore();
    }, 300);
});

test('deleteUser async action SUCCESS', (t) => {

    t.plan(2);

    const { dispatch, queue } = createThunk();
    const sandbox = createSandbox();

    const successPromise = new Promise(resolve => resolve(
        { data: true }
    ));
    sandbox.stub(axios, 'post').returns(successPromise);

    dispatch(actions.deleteUser());

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.DELETE_USER_REQUEST },
            'flags deleteUser request'
        );
        t.deepEqual(
            queue.shift(),
            { type: actions.DELETE_USER_SUCCESS },
            'flags deleteUser success'
        );
        sandbox.restore();
    }, 300);
});

test('deleteUser async action FAILURE', (t) => {

    t.plan(2);

    const { dispatch, queue } = createThunk();

    const customError = {
        response: { status: 500 },
        message: 'Sorry, something went wrong!',
        reducerState: 'superAdmin'
    };

    const axiosFailurePromise = Promise.reject(customError);
    const sandbox = createSandbox();
    sandbox.stub(axios, 'post').returns(axiosFailurePromise);

    dispatch(actions.deleteUser());
    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.DELETE_USER_REQUEST },
            'flags deleteUser request'
        );
        t.deepEqual(
            queue.shift(),
            { type: actions.DELETE_USER_FAILURE, error: customError },
            'flags deleteUser error'
        );
        sandbox.restore();
    }, 300);
});

test('downloadData async action SUCCESS', (t) => {

    t.plan(2);

    const { dispatch, queue } = createThunk();
    const sandbox = createSandbox();
    const successPromise = new Promise(resolve => resolve({
        request: {
            responseURL: '/test'
        }
    } ));
    sandbox.stub(axios, 'get').returns(successPromise);

    dispatch(actions.downloadData('/test'));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.DOWNLOAD_DATA_REQUEST },
            'flags downloadData request'
        );
        t.deepEqual(
            queue.shift(),
            { type: actions.DOWNLOAD_DATA_SUCCESS },
            'flags downloadData success'
        );
        sandbox.restore();
    }, 300);
});

test('downloadData async action FAILURE', (t) => {

    t.plan(2);

    const { dispatch, queue } = createThunk();

    const customError = {
        response: { status: 500 },
        message: 'Sorry, something went wrong!',
        reducerState: 'superAdmin'
    };

    const axiosFailurePromise = Promise.reject(customError);
    const sandbox = createSandbox();
    sandbox.stub(axios, 'get').returns(axiosFailurePromise);

    dispatch(actions.downloadData());
    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.DOWNLOAD_DATA_REQUEST },
            'flags downloadData request'
        );
        t.deepEqual(
            queue.shift(),
            { type: actions.DOWNLOAD_DATA_FAILURE, error: customError },
            'flags downloadData error'
        );
        sandbox.restore();
    }, 300);
});
