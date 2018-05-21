import test from 'tape';
import sinon from 'sinon';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/group-admin';
import { groupAdminDashboardData } from '../../utils/data-fixtures';
// modules that get stubbed with sinon
import axios from 'axios';


const createSandbox = sinon.sandbox.create;

test('getGroupAdminDashboard async action SUCCESS', (t) => {

    t.plan(2);

    const { dispatch, queue } = createThunk();
    const sandbox = createSandbox();

    const successPromise = new Promise(resolve => resolve(
        { data: groupAdminDashboardData }
    ));
    sandbox.stub(axios, 'get').returns(successPromise);

    dispatch(actions.getGroupAdminDashboard());

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.GET_GROUP_ADMIN_DASHBOARD_REQUEST },
            'flags getGroupAdmin request'
        );
        t.deepEqual(
            queue.shift(),
            { type: actions.GET_GROUP_ADMIN_DASHBOARD_SUCCESS, data: groupAdminDashboardData },
            'flags getGroupAdmin success'
        );
        sandbox.restore();
    }, 300);
});

test('getGroupAdminDashboard async action FAILURE', (t) => {

    t.plan(2);

    const { dispatch, queue } = createThunk();

    const customError = {
        response: { status: 500 },
        message: 'Sorry, something went wrong!',
        reducerState: 'groupAdmin'
    };
    const axiosFailurePromise = Promise.reject(customError);
    const sandbox = createSandbox();
    sandbox.stub(axios, 'get').returns(axiosFailurePromise);

    dispatch(actions.getGroupAdminDashboard());
    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.GET_GROUP_ADMIN_DASHBOARD_REQUEST },
            'flags getGroupAdmin request'
        );
        t.deepEqual(
            queue.shift(),
            { type: actions.GET_GROUP_ADMIN_DASHBOARD_FAILURE, error: customError },
            'flags getGroupAdmin error'
        );
        sandbox.restore();
    }, 300);
});

test('updateUserIsActive async action SUCCESS', (t) => {

    t.plan(2);

    const { dispatch, queue } = createThunk();
    const sandbox = createSandbox();

    const successPromise = new Promise(resolve => resolve(
        { data: true }
    ));
    sandbox.stub(axios, 'post').returns(successPromise);

    dispatch(actions.updateUserIsActive());

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.UPDATE_USER_IS_ACTIVE_REQUEST },
            'flags updateUserIsActive request'
        );
        t.deepEqual(
            queue.shift(),
            { type: actions.UPDATE_USER_IS_ACTIVE_SUCCESS },
            'flags updateUserIsActive success'
        );
        sandbox.restore();
    }, 300);
});

test('updateUserIsActive async action FAILURE', (t) => {

    t.plan(2);

    const { dispatch, queue } = createThunk();

    const customError = {
        response: { status: 500 },
        message: 'Sorry, something went wrong!',
        reducerState: 'groupAdmin'
    };

    const axiosFailurePromise = Promise.reject(customError);
    const sandbox = createSandbox();
    sandbox.stub(axios, 'post').returns(axiosFailurePromise);

    dispatch(actions.updateUserIsActive());
    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.UPDATE_USER_IS_ACTIVE_REQUEST },
            'flags updateUserIsActive request'
        );
        t.deepEqual(
            queue.shift(),
            { type: actions.UPDATE_USER_IS_ACTIVE_FAILURE, error: customError },
            'flags updateUserIsActive error'
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
        reducerState: 'groupAdmin'
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
