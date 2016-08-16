import test from 'tape';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/module';
import { getModuleError as error, getModuleUsersError, removeModuleMembersError } from '../../utils/action-fixtures';
import deepFreeze from '../../utils/deepFreeze';
import { module as data, getModuleUsers } from '../../utils/data-fixtures';


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
// GET MODULE USERS ACTIONS
//
test('getModuleUsers async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();

    dispatch(actions.getModuleUsers());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.GET_MODULE_USERS_REQUEST
    };
    t.deepEqual(actual, expected);
});

test('getModuleUsersRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_MODULE_USERS_REQUEST
    }

    const actual = deepFreeze(actions.getModuleUsersRequest());
    t.deepEqual(actual, expected);
});

test('getModuleUsersSuccess creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.GET_MODULE_USERS_SUCCESS,
        data: getModuleUsers
    }

    const actual = deepFreeze(actions.getModuleUsersSuccess(getModuleUsers));
    t.deepEqual(actual, expected);
});

test('getModuleUsersFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_MODULE_USERS_FAILURE,
        error: getModuleUsersError
    };

    const actual = deepFreeze(actions.getModuleUsersFailure(getModuleUsersError));
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
// GET MODULE  ACTIONS
//
test('removeModuleMembers async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();

    dispatch(actions.removeModuleMembers());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.REMOVE_MODULE_MEMBERS_REQUEST
    };
    t.deepEqual(actual, expected);
});

test('removeModuleMembersRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.REMOVE_MODULE_MEMBERS_REQUEST
    }

    const actual = deepFreeze(actions.removeModuleMembersRequest());
    t.deepEqual(actual, expected);
});

test('removeModuleMembersSuccess creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.REMOVE_MODULE_MEMBERS_SUCCESS,
    }

    const actual = deepFreeze(actions.removeModuleMembersSuccess());
    t.deepEqual(actual, expected);
});

test('removeModuleMembersFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.REMOVE_MODULE_MEMBERS_FAILURE,
        error: removeModuleMembersError
    };

    const actual = deepFreeze(actions.removeModuleMembersFailure(removeModuleMembersError));
    t.deepEqual(actual, expected);
});
