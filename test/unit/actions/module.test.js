import test from 'tape';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/module';
import { getModuleError as error, getModuleUsersError, removeUserFromModuleError } from '../../utils/action-fixtures';
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
test('removeUserFromModule async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();

    dispatch(actions.removeUserFromModule());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.REMOVE_USER_FROM_MODULE_REQUEST
    };
    t.deepEqual(actual, expected);
});

test('removeUserFromModuleRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.REMOVE_USER_FROM_MODULE_REQUEST
    }

    const actual = deepFreeze(actions.removeUserFromModuleRequest());
    t.deepEqual(actual, expected);
});

test('removeUserFromModuleSuccess creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.REMOVE_USER_FROM_MODULE_SUCCESS,
    }

    const actual = deepFreeze(actions.removeUserFromModuleSuccess());
    t.deepEqual(actual, expected);
});

test('removeUserFromModuleFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.REMOVE_USER_FROM_MODULE_FAILURE,
        error: removeUserFromModuleError
    };

    const actual = deepFreeze(actions.removeUserFromModuleFailure(removeUserFromModuleError));
    t.deepEqual(actual, expected);
});
