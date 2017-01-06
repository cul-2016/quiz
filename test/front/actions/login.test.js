import test from 'tape';
import sinon from 'sinon';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/login';
import * as userActions from '../../../src/js/actions/user';
import deepFreeze from '../../utils/deepFreeze';
import { authenticateUserError as error } from '../../utils/action-fixtures';
// modules that get stubbed with sinon
import axios from 'axios';
import { hashHistory } from 'react-router';

const createSandbox = sinon.sandbox.create;


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

test('authenticateUser async action: SUCCESS --> redirect to dashboard', (t) => {

    t.plan(4);

    const responseData = {
        ...require('../../utils/data-fixtures.js').userDetails,
        is_lecturer: false
    };
    const successPromise = new Promise(resolve =>
        resolve( { data: responseData } )
    );
    const sandbox = createSandbox();
    sandbox.stub(axios, 'post').returns(successPromise);
    const hashHistorySpy = sandbox.spy(hashHistory, 'push');

    const { dispatch, queue } = createThunk();
    dispatch(actions.authenticateUser('email', 'password'));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.AUTHENTICATE_USER_REQUEST },
            'flags user authentication request'
        );
        t.deepEqual(
            queue.shift(),
            { type: actions.AUTHENTICATE_USER_SUCCESS },
            'flags request success'
        );
        t.deepEqual(
            queue.shift(),
            { type: userActions.SET_USER_DETAILS, data: responseData },
            'sets user details'
        );
        t.ok(hashHistorySpy.calledWith('/dashboard'), 'redirects to dashboard');
        sandbox.restore();
    }, 300);

});

test('authenticateUser async action: SUCCESS --> error message', (t) => {

    t.plan(2);

    const customResponse = { data: { message: 'error message' } };
    const successPromise = new Promise(resolve =>
        resolve(customResponse)
    );

    const sandbox = createSandbox();
    sandbox.stub(axios, 'post').returns(successPromise);

    const { dispatch, queue } = createThunk();
    dispatch(actions.authenticateUser('email', 'password'));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.AUTHENTICATE_USER_REQUEST },
            'flags user authentication request'
        );
        t.deepEqual(
            queue.shift(),
            {
                type: actions.INCORRECT_USER_DETAILS,
                data: customResponse.data.message
            },
            'returns custom error message'
        );
        sandbox.restore();
    }, 300);

});

test('authenticateUser async action: FAILURE', (t) => {

    t.plan(2);

    const customError = { error: 'error message' };
    const failurePromise = new Promise((resolve, reject) =>
        reject(customError)
    );

    const sandbox = createSandbox();
    sandbox.stub(axios, 'post').returns(failurePromise);

    const { dispatch, queue } = createThunk();
    dispatch(actions.authenticateUser('email', 'password'));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.AUTHENTICATE_USER_REQUEST },
            'flags user authentication request'
        );
        t.deepEqual(
            queue.shift(),
            {
                type: actions.AUTHENTICATE_USER_FAILURE,
                error: customError
            },
            'flags request failure with custom error message'
        );
        sandbox.restore();
    }, 300);

});

test('authenticateUserRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.AUTHENTICATE_USER_REQUEST,
    };

    const actual2 = deepFreeze(actions.authenticateUserRequest());
    t.deepEqual(actual2, expected);
});

test('authenticateUserSuccess creates the correct action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.AUTHENTICATE_USER_SUCCESS
    };

    const actual2 = deepFreeze(actions.authenticateUserSuccess());
    t.deepEqual(actual2, expected);
});

test('authenticateUserFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.AUTHENTICATE_USER_FAILURE,
        error
    };
    const actual = deepFreeze(actions.authenticateUserFailure(error));
    t.deepEqual(actual, expected);
});

test('logout creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.LOGOUT
    };

    const actual = deepFreeze(actions.logout());
    t.deepEqual(actual, expected);
});
