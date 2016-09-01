import test from 'tape';
import { initialState as moduleState } from '../../../src/js/reducers/module';
import { getModuleError as error, getModuleMembersError, removeModuleMember } from '../../utils/action-fixtures';
import { module as lecturerData,
         getModuleForStudentData as studentData,
         getModuleMembers } from '../../utils/data-fixtures';
import { module as reducer } from '../../../src/js/reducers/module';
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

test('GET_MODULE_SUCCESS works for a lecturer', (t) => {

    t.plan(1);

    const initialState = deepFreeze(Object.assign({},
        moduleState,
        { isFetchingModule: true }
    ));

    const is_lecturer = true;
    const action = {
        type: 'GET_MODULE_SUCCESS',
        is_lecturer,
        data: lecturerData
    };
    const expected = Object.assign({},
        moduleState,
        lecturerData,
        { isFetchingModule: false }
    );

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('GET_MODULE_SUCCESS works for a student', (t) => {

    t.plan(1);

    const initialState = deepFreeze(Object.assign({},
        moduleState,
        studentData,
        { isFetchingModule: true }
    ));

    const is_lecturer = false;
    const action = {
        type: 'GET_MODULE_SUCCESS',
        is_lecturer,
        data: studentData
    };
    const expected = Object.assign({},
        moduleState,
        studentData,
        { isFetchingModule: false }
    );

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
// GET MODULE MEMBERS Reducers
//
test('GET_MODULE_MEMBERS_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);

    const action = {
        type: 'GET_MODULE_MEMBERS_REQUEST',
    };
    const expected = Object.assign({}, moduleState, { isFetchingMembers: true });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('GET_MODULE_MEMBERS_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);

    const action = {
        type: 'GET_MODULE_MEMBERS_SUCCESS',
        data: getModuleMembers
    };
    const expected = Object.assign({}, moduleState, {
        isFetchingMembers: false,
        members: getModuleMembers,
    });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('GET_MODULE_MEMBERS_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);

    const action = {
        type: 'GET_MODULE_MEMBERS_FAILURE',
        error: getModuleMembersError
    };
    const expected = Object.assign({}, moduleState, { error: error, isFetchingMembers: false });

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

//
// REMOVE MODULE MEMBERS Reducers
//
test('REMOVE_MODULE_MEMBER_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);

    const action = {
        type: 'REMOVE_MODULE_MEMBER_REQUEST',
    };
    const expected = Object.assign({}, moduleState, { isRemovingMember: true });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('REMOVE_MODULE_MEMBER_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);

    const action = {
        type: 'REMOVE_MODULE_MEMBER_SUCCESS'
    };
    const expected = Object.assign({}, moduleState, {
        isRemovingMember: false,
    });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('REMOVE_MODULE_MEMBER_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);

    const action = {
        type: 'REMOVE_MODULE_MEMBER_FAILURE',
        error: removeModuleMember
    };
    const expected = Object.assign({}, moduleState, { error: removeModuleMember, isRemovingMember: false });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});
