import test from 'tape';
import { module as moduleState } from '../../utils/reducer-fixtures';
import { getModuleError as error, getModuleUsersError } from '../../utils/action-fixtures';
import { module as data, getModuleUsers } from '../../utils/data-fixtures';
import reducer from '../../../src/js/reducers/module';
import deepFreeze from '../../utils/deepFreeze';

//
// GET MODULE Reducers
//
test('GET_MODULE_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);

    const action = {
        type: 'GET_MODULE_REQUEST',
    };
    const expected = Object.assign({}, moduleState, { isFetchingModule: true });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('GET_MODULE_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);

    const action = {
        type: 'GET_MODULE_SUCCESS',
        data
    };
    const expected = Object.assign({}, moduleState, {
        isFetchingModule: false,
        module: data.module,
        quizzes: data.quizzes
    });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('GET_MODULE_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);

    const action = {
        type: 'GET_MODULE_FAILURE',
        error
    };
    const expected = Object.assign({}, moduleState, { error: error });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

//
// GET MODULE USERS Reducers
//
test('GET_MODULE_USERS_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);

    const action = {
        type: 'GET_MODULE_USERS_REQUEST',
    };
    const expected = Object.assign({}, moduleState, { isFetchingModuleUsers: true });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('GET_MODULE_USERS_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);

    const action = {
        type: 'GET_MODULE_USERS_SUCCESS',
        data: getModuleUsers
    };
    const expected = Object.assign({}, moduleState, {
        isFetchingModuleUsers: false,
        users: getModuleUsers,
    });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('GET_MODULE_USERS_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);

    const action = {
        type: 'GET_MODULE_USERS_FAILURE',
        error: getModuleUsersError
    };
    const expected = Object.assign({}, moduleState, { error: error, isFetchingModuleUsers: false });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

//
//
//
test('OPEN_QUIZ works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);
    const action = {
        type: 'OPEN_QUIZ'
    };
    const expected = Object.assign({}, moduleState, { isQuizOpen: true });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('CLOSE_QUIZ works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);
    const action = {
        type: 'CLOSE_QUIZ'
    };
    const expected = Object.assign({}, moduleState, { isQuizOpen: false });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});
