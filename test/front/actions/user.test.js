import test from 'tape';
import sinon from 'sinon';
import axios from 'axios';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/user';
import deepFreeze from '../../utils/deepFreeze';
import { userDetails as data } from '../../utils/data-fixtures';
import { getUserDetailsError as error } from '../../utils/action-fixtures';


const createSandbox = sinon.sandbox.create;

test('setUserDetails creates the correct action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.SET_USER_DETAILS,
        data
    };

    const actual = deepFreeze(actions.setUserDetails(data));
    t.deepEqual(actual, expected);
});

test('toggleCookieMessage creates the correct action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.TOGGLE_COOKIE_MESSAGE,
    };

    const actual = deepFreeze(actions.toggleCookieMessage());
    t.deepEqual(actual, expected);
});


// -----
// GET_USER_DETAILS
// -----

test('getUserDetails aysnc action creator: user details retrieved', (t) => {

    t.plan(2);
    const { dispatch, queue } = createThunk();
    const mockResponse = { data: { user_id: 1, is_lecturer: true } };
    const userDetailsPromise = Promise.resolve(mockResponse);
    const sandbox = createSandbox();
    sandbox.stub(axios, 'get').returns(userDetailsPromise);

    dispatch(actions.getUserDetails());
    setTimeout(() => {
        let actual = queue.shift();
        let expected = {
            type: actions.GET_USER_DETAILS_REQUEST
        };
        t.deepEqual(actual, expected, 'flags request');

        actual = queue.shift();
        expected = {
            type: actions.GET_USER_DETAILS_SUCCESS,
            data: mockResponse.data
        };
        t.deepEqual(actual, expected, 'flags success');
        sandbox.restore();
    }, 300);
});

test('getUserDetails async actions creator: axios failure', (t) => {

    t.plan(2);
    const { dispatch, queue } = createThunk();
    const customError = {
        response: { status: 500 },
        message: 'Sorry, something went wrong!'
    };
    const sandbox = createSandbox();
    const rejectedPromise = Promise.reject(customError);
    sandbox.stub(axios, 'get').returns(rejectedPromise);

    dispatch(actions.getUserDetails());
    setTimeout(() => {
        let actual = queue.shift();
        let expected = {
            type: actions.GET_USER_DETAILS_REQUEST
        };
        t.deepEqual(actual, expected, 'flags request');

        actual = queue.shift();
        expected = {
            type: actions.GET_USER_DETAILS_FAILURE,
            error: customError
        };
        t.deepEqual(actual, expected, 'flags success');
        sandbox.restore();
    }, 300);
});

test('getUserRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_USER_DETAILS_REQUEST,
    };

    const actual = deepFreeze(actions.getUserDetailsRequest());
    t.deepEqual(actual, expected);
});

test('getUserDetailsSuccess creates the correct action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.GET_USER_DETAILS_SUCCESS,
        data
    };

    const actual = deepFreeze(actions.getUserDetailsSuccess(data));
    t.deepEqual(actual, expected);
});

test('getUserDetailsFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_USER_DETAILS_FAILURE,
        error
    };
    const actual = deepFreeze(actions.getUserDetailsFailure(error));
    t.deepEqual(actual, expected);
});
