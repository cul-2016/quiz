import test from 'tape';
import sinon from 'sinon';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/super-admin';
import { superAdminDashboardData } from '../../utils/data-fixtures';
// modules that get stubbed with sinon
import axios from 'axios';
import deepFreeze from '../../utils/deepFreeze';
import { hashHistory } from 'react-router';


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


test('updateInput action works when name is being inputted', (t) => {

    t.plan(1);

    const value = 'testing name';
    const name = 'name';
    const expected = {
        type: actions.UPDATE_INPUT,
        value: 'testing name',
        name: 'name'
    };

    const actual = deepFreeze(actions.updateInput(value, name));
    t.deepEqual(actual, expected);

});

test('updateInput action works when email is being inputted', (t) => {

    t.plan(1);

    const value = 'testing@email.com';
    const name = 'email';
    const expected = {
        type: actions.UPDATE_INPUT,
        value: 'testing@email.com',
        name: 'email'
    };

    const actual = deepFreeze(actions.updateInput(value, name));
    t.deepEqual(actual, expected);

});

test('updateInput action works when accountType is being selected', (t) => {

    t.plan(1);

    const value = 'group admin';
    const name = 'accountType';
    const expected = {
        type: actions.UPDATE_INPUT,
        value: 'group admin',
        name: 'accountType'
    };

    const actual = deepFreeze(actions.updateInput(value, name));
    t.deepEqual(actual, expected);

});

test('submitClient async action SUCCESS', (t) => {

    t.plan(2);

    const { dispatch, queue } = createThunk();
    const sandbox = createSandbox();

    const successPromise = new Promise(resolve => resolve(
        { data: { message: 'data has been successfully posted and user has been sent the email.' } }
    ));

    sandbox.stub(axios, 'post').returns(successPromise);
    const hashHistorySpy = sandbox.spy(hashHistory, 'push');

    dispatch(actions.submitClient('name', 'email', 'institution', 'department', 'accountType', 'paid'));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.SUBMIT_CLIENT_REQUEST },
            'flags getSuperAdmin request'
        );
        t.deepEqual(
            queue.shift(),
            { type: actions.SUBMIT_CLIENT_SUCCESS },
            'flags getSuperAdmin success'
        );
        // t.ok(hashHistorySpy.calledWith('/super-admin'), 'redirects to super-admin');
        sandbox.restore();
    }, 300);
});

test('submitClient async action SUCCESS', (t) => {

    t.plan(2);

    const customError = {
        response: { status: 500 },
        message: 'Sorry, something went wrong!'
    };

    const failurePromise = Promise.reject(customError);

    const { dispatch, queue } = createThunk();
    const sandbox = createSandbox();

    sandbox.stub(axios, 'post').returns(failurePromise);
    const hashHistorySpy = sandbox.spy(hashHistory, 'push');

    dispatch(actions.submitClient('name', 'email', 'institution', 'department', 'accountType', 'paid'));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.SUBMIT_CLIENT_REQUEST },
            'flags getSuperAdmin request'
        );
        t.deepEqual(
            queue.shift(),
            {
                type: actions.SUBMIT_CLIENT_FAILURE,
                error: {
                    response: { status: 500 },
                    message: 'Sorry, something went wrong!'
                }
            },
            'flags getSuperAdmin success'
        );
        // t.ok(hashHistorySpy.calledWith('/super-admin'), 'redirects to super-admin');
        sandbox.restore();
    }, 300);
});

test('displayError action creator returns the expected action', (t) => {

    t.plan(1);
    const error = {
        message: 'something has gone wrong'
    };
    const expected = {
        type: actions.DISPLAY_ERROR,
        error
    };
    const actual = actions.displayError(error);
    t.deepEqual(actual, expected);
});

test('clearClientForm action creator returns the expected action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.CLEAR_CLIENT_FORM
    };
    const actual = actions.clearClientForm();
    t.deepEqual(actual, expected);
});