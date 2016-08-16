import test from 'tape';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/module';
import { getModuleError as error, getModuleMembersError, removeModuleMemberError } from '../../utils/action-fixtures';
import deepFreeze from '../../utils/deepFreeze';
import { module as data, getModuleMembers } from '../../utils/data-fixtures';


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
    }

    const actual = deepFreeze(actions.getModuleRequest());
    t.deepEqual(actual, expected);
});

test('getModuleSuccess creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.GET_MODULE_SUCCESS,
        data
    }

    const actual = deepFreeze(actions.getModuleSuccess(data));
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
    }

    const actual = deepFreeze(actions.getModuleMembersRequest());
    t.deepEqual(actual, expected);
});

test('getModuleMembersSuccess creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.GET_MODULE_MEMBERS_SUCCESS,
        data: getModuleMembers
    }

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

//
//
//


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
    }

    const actual = deepFreeze(actions.removeModuleMemberRequest());
    t.deepEqual(actual, expected);
});

test('removeModuleMemberSuccess creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.REMOVE_MODULE_MEMBER_SUCCESS,
    }

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
