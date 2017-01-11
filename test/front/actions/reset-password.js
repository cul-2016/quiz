import test from 'tape';
import sinon from 'sinon';
import createThunk from '../../utils/mockThunk';

// modules that get stubbed with sinon
import axios from 'axios';
import { hashHistory } from 'react-router';
const createSandbox = sinon.sandbox.create;

import * as actions from '../../../src/js/actions/reset-password';
import * as loginActions from '../../../src/js/actions/login';
import deepFreeze from '../../utils/deepFreeze';


test('updateEmail creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.UPDATE_EMAIL,
        value: 'test@city.ac.uk'
    };
    const actual = deepFreeze(actions.updateEmail('test@city.ac.uk'));
    t.deepEqual(actual, expected);
});

test('updatePassword creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.UPDATE_PASSWORD,
        value: 'testpassword'
    };
    const actual = deepFreeze(actions.updatePassword('testpassword'));
    t.deepEqual(actual, expected);
});

test('updateConfirmedPassword creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.UPDATE_CONFIRMED_PASSWORD,
        value: 'testpassword'
    };
    const actual = deepFreeze(actions.updateConfirmedPassword('testpassword'));
    t.deepEqual(actual, expected);
});

test('resetPasswordRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.RESET_PASSWORD_REQUEST,
        value: true
    };
    const actual = deepFreeze(actions.resetPasswordRequest());
    t.deepEqual(actual, expected);
});

test('resetPasswordSuccess creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.RESET_PASSWORD_SUCCESS,
        value: false
    };
    const actual = deepFreeze(actions.resetPasswordSuccess());
    t.deepEqual(actual, expected);
});

test('resetPasswordFailure creates the correct action', (t) => {

    t.plan(1);
    const fakeError = { error: 'errormessage' };
    const expected = {
        type: actions.RESET_PASSWORD_FAILURE,
        value: false,
        error: fakeError
    };
    const actual = deepFreeze(actions.resetPasswordFailure(fakeError));
    t.deepEqual(actual, expected);
});

test('resetPassword: success --> redirect to "email sent" message', t => {

    t.plan(3);

    const email = 'test@test.com';
    const { dispatch, queue } = createThunk();
    const sandbox = createSandbox();
    const successPromise = new Promise(resolve => resolve({
        data: true
    }));
    sandbox.stub(axios, 'post').returns(successPromise);

    const hashHistorySpy = sandbox.spy(hashHistory, 'push');
    dispatch(actions.resetPassword(email));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            {
                type: actions.RESET_PASSWORD_REQUEST,
                value: true
            },
            'request has been flagged'
        );
        t.deepEqual(
            queue.shift(),
            {
                type: actions.RESET_PASSWORD_SUCCESS,
                value: false
            },
            'request success has been flagged'
        );
        t.ok(hashHistorySpy.calledWith('/reset-password-email-sent'), 'redirects to "email sent" view');
        sandbox.restore();
    }, 300);
});

test('resetPassword: failure --> custom error that email does not exist', t => {

    t.plan(2);

    const email = 'test@test.com';
    const { dispatch, queue } = createThunk();
    const sandbox = createSandbox();

    const customError = {
        message: 'Sorry the email does not exist'
    };
    const successPromise = new Promise(resolve => resolve({
        data: customError
    }));
    sandbox.stub(axios, 'post').returns(successPromise);

    dispatch(actions.resetPassword(email));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            {
                type: actions.RESET_PASSWORD_REQUEST,
                value: true
            },
            'request has been flagged'
        );
        t.deepEqual(
            queue.shift(),
            {
                type: actions.RESET_PASSWORD_FAILURE,
                value: false,
                error: customError.message
            },
            'failure has been flagged'
        );
        sandbox.restore();
    }, 300);
});

test('resetPassword: failure --> error message', t => {

    t.plan(2);

    const email = 'test@test.com';
    const { dispatch, queue } = createThunk();
    const customError = {
        response: { status: 500 },
        message: 'Sorry, something went wrong!'
    };

    const sandbox = createSandbox();
    const failurePromise = new Promise((resolve, reject) => reject(customError));
    sandbox.stub(axios, 'post').returns(failurePromise);

    dispatch(actions.resetPassword(email));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            {
                type: actions.RESET_PASSWORD_REQUEST,
                value: true
            },
            'request has been flagged'
        );
        t.deepEqual(
            queue.shift(),
            {
                type: actions.RESET_PASSWORD_FAILURE,
                value: false,
                error: {
                    response: { status: 500 },
                    message: 'Sorry, something went wrong!'
                }
            },
            'request failure has been flagged'
        );

        sandbox.restore();
    }, 300);
});

test('submitNewPassword: server failure --> something went wrong message', t => {

    t.plan(2);

    const password = 'new-password';
    const code = 'reset-password-code';
    const err = {
        response: { status: 500 },
        message: 'sorry, something went wrong!'
    };

    const sandbox = createSandbox();
    const failurePromise = new Promise((resolve, reject) => reject(err));
    sandbox.stub(axios, 'post').returns(failurePromise);

    const { dispatch, queue } = createThunk();
    dispatch(actions.submitNewPassword(password, code));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            {
                type: actions.SUBMIT_NEW_PASSWORD_REQUEST,
                value: true
            },
            'request has been flagged'
        );
        t.deepEqual(
            queue.shift(),
            {
                type: actions.SUBMIT_NEW_PASSWORD_FAILURE,
                value: false,
                error: 'Sorry, something went wrong!'
            },
            'request failure has been flagged'
        );

        sandbox.restore();
    }, 300);
});

test('submitNewPassword: message from server --> display message', t => {

    t.plan(2);

    const password = 'new-password';
    const code = 'reset-password-code';

    const customResponse = { data: { message: 'your token has expired' } };
    const sandbox = createSandbox();
    const successPromise = new Promise((resolve) => resolve(customResponse));
    sandbox.stub(axios, 'post').returns(successPromise);

    const { dispatch, queue } = createThunk();
    dispatch(actions.submitNewPassword(password, code));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            {
                type: actions.SUBMIT_NEW_PASSWORD_REQUEST,
                value: true
            },
            'request has been flagged'
        );
        t.deepEqual(
            queue.shift(),
            {
                type: actions.SUBMIT_NEW_PASSWORD_FAILURE,
                value: false,
                error: customResponse.data.message
            },
            'request failure has been flagged'
        );

        sandbox.restore();
    }, 300);
});

test('submitNewPassword: success --> redirect to login', t => {

    t.plan(4);

    const password = 'new-password';
    const code = 'reset-password-code';

    const customResponse = { data: true };
    const sandbox = createSandbox();
    const successPromise = new Promise((resolve) => resolve(customResponse));
    sandbox.stub(axios, 'post').returns(successPromise);
    const hashHistorySpy = sandbox.spy(hashHistory, 'push');

    const { dispatch, queue } = createThunk();
    dispatch(actions.submitNewPassword(password, code));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            {
                type: actions.SUBMIT_NEW_PASSWORD_REQUEST,
                value: true
            },
            'request has been flagged'
        );
        t.deepEqual(
            queue.shift(),
            {
                type: actions.SUBMIT_NEW_PASSWORD_SUCCESS,
                value: false
            },
            'request success has been flagged'
        );
        t.deepEqual(
            queue.shift(),
            {
                type: loginActions.LOGOUT
            },
            'state is cleared'
        );
        t.ok(hashHistorySpy.calledWith('/'), 'redirected to "/"');
        sandbox.restore();
    }, 300);
});

test('submitPasswordRequest creates the correct action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.SUBMIT_NEW_PASSWORD_REQUEST,
        value: true
    };
    const actual = deepFreeze(actions.submitPasswordRequest());
    t.deepEqual(actual, expected);
});

test('submitNewPasswordSuccess creates the correct action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.SUBMIT_NEW_PASSWORD_SUCCESS,
        value: false
    };
    const actual = deepFreeze(actions.submitNewPasswordSuccess());
    t.deepEqual(actual, expected);
});

test('submitNewPasswordFailure creates the correct action', (t) => {

    t.plan(1);

    const customError = { error: 'hey, there is an error!' };
    const expected = {
        type: actions.SUBMIT_NEW_PASSWORD_FAILURE,
        value: false,
        error: customError
    };
    const actual = deepFreeze(actions.submitNewPasswordFailure(customError));
    t.deepEqual(actual, expected);
});
