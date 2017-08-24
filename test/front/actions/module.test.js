import test from 'tape';
import sinon from 'sinon';
import axios from 'axios';

import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/module';
import { getModuleError as error, getModuleMembersError, removeModuleMemberError } from '../../utils/action-fixtures';
import deepFreeze from '../../utils/deepFreeze';
import { module as data, getModuleMembers } from '../../utils/data-fixtures';
import { initialState } from '../../../src/js/reducers/module.js';

const createSandbox = sinon.sandbox.create;


//
// GET MODULE  ACTIONS
//
test('getModule async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();

    dispatch(actions.getModule());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.GET_MODULE_REQUEST
    };
    t.deepEqual(actual, expected);
});

test('getModuleRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_MODULE_REQUEST
    };
    const actual = deepFreeze(actions.getModuleRequest());
    t.deepEqual(actual, expected);
});

test('getModuleSuccess creates the correct action for a lecturer', (t) => {

    t.plan(1);
    const is_lecturer = true;

    const expected = {
        type: actions.GET_MODULE_SUCCESS,
        is_lecturer,
        data
    };
    const actual = deepFreeze(actions.getModuleSuccess(is_lecturer, data));
    t.deepEqual(actual, expected);
});

test('getModuleSuccess creates the correct action for a student', (t) => {

    t.plan(1);
    const is_lecturer = false;

    const expected = {
        type: actions.GET_MODULE_SUCCESS,
        is_lecturer,
        data
    };
    const actual = deepFreeze(actions.getModuleSuccess(is_lecturer, data));
    t.deepEqual(actual, expected);
});

test('getModuleFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_MODULE_FAILURE,
        error
    };
    const actual = deepFreeze(actions.getModuleFailure(error));
    t.deepEqual(actual, expected);
});

//
// GET MODULE MEMBERS ACTIONS
//
test('getModuleMembers async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();

    dispatch(actions.getModuleMembers());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.GET_MODULE_MEMBERS_REQUEST
    };
    t.deepEqual(actual, expected);
});

test('getModuleMembersRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_MODULE_MEMBERS_REQUEST
    };

    const actual = deepFreeze(actions.getModuleMembersRequest());
    t.deepEqual(actual, expected);
});

test('getModuleMembersSuccess creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.GET_MODULE_MEMBERS_SUCCESS,
        data: getModuleMembers
    };

    const actual = deepFreeze(actions.getModuleMembersSuccess(getModuleMembers));
    t.deepEqual(actual, expected);
});

test('getModuleMembersFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_MODULE_MEMBERS_FAILURE,
        error: getModuleMembersError
    };

    const actual = deepFreeze(actions.getModuleMembersFailure(getModuleMembersError));
    t.deepEqual(actual, expected);
});



test('openQuiz creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.OPEN_QUIZ
    };

    const actual = deepFreeze(actions.openQuiz());
    t.deepEqual(actual, expected);
});

test('closeQuiz creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.CLOSE_QUIZ
    };

    const actual = deepFreeze(actions.closeQuiz());
    t.deepEqual(actual, expected);
});


//
// REMOVE MODULE MEMBERS ACTIONS
//
test('removeModuleMember async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();

    dispatch(actions.removeModuleMember());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.REMOVE_MODULE_MEMBER_REQUEST
    };
    t.deepEqual(actual, expected);
});

test('removeModuleMemberRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.REMOVE_MODULE_MEMBER_REQUEST
    };

    const actual = deepFreeze(actions.removeModuleMemberRequest());
    t.deepEqual(actual, expected);
});

test('removeModuleMemberSuccess creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.REMOVE_MODULE_MEMBER_SUCCESS,
    };

    const actual = deepFreeze(actions.removeModuleMemberSuccess());
    t.deepEqual(actual, expected);
});

test('removeModuleMemberFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.REMOVE_MODULE_MEMBER_FAILURE,
        error: removeModuleMemberError
    };

    const actual = deepFreeze(actions.removeModuleMemberFailure(removeModuleMemberError));
    t.deepEqual(actual, expected);
});


//
// SHARING QUIZ ID
//

test('generateShareId async action: success', (t) => {
    t.plan(2);
    const quiz_id = 1,
        module_id = 'TEST',
        sandbox = createSandbox(),
        successResponse = 'ok',
        successPromise = new Promise((resolve) => resolve(successResponse));

    sandbox.stub(axios, 'post').returns(successPromise);

    const { dispatch, queue } = createThunk({ module: initialState });

    dispatch(actions.generateShareId(quiz_id, null, module_id));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            {
                type: actions.GENERATE_SHARE_ID_REQUEST
            },
            'flags generateShareId request'
        );

        t.deepEqual(
            queue.shift(),
            {
                type: actions.GENERATE_SHARE_ID_SUCCESS
            },
            'flags generateShareId success'
        );
        sandbox.restore();
    }, 300);
});

test('generateShareId async action: failure', (t) => {
    t.plan(2);

    const quiz_id = 1,
        module_id = 'TEST',
        sandbox = createSandbox(),
        failureResponse = {
            response: { status: 500 },
            message: 'Sorry, something went wrong!'
        },
        failurePromise = Promise.reject(failureResponse);

    sandbox.stub(axios, 'post').returns(failurePromise);
    const { dispatch, queue } = createThunk({ module: initialState });

    dispatch(actions.generateShareId(quiz_id, null, module_id));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            {
                type: actions.GENERATE_SHARE_ID_REQUEST
            },
            'flags generateShareId request'
        );

        t.deepEqual(
            queue.shift(),
            {
                type: actions.GENERATE_SHARE_ID_FAILURE,
                error: failureResponse
            },
            'flags generateShareId failure'
        );
        sandbox.restore();
    }, 300);
});
