import test from 'tape';
import { quizMembers as quizMembersState } from '../../utils/reducer-fixtures';
import { getQuizMembersError, editScoreError } from '../../utils/action-fixtures';
import { getQuizMembers } from '../../utils/data-fixtures';
import reducer from '../../../src/js/reducers/quiz-members';
import deepFreeze from '../../utils/deepFreeze';

//
// GET QUIZ MEMBERS Reducers
//
test('GET_QUIZ_MEMBERS_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(quizMembersState);

    const action = {
        type: 'GET_QUIZ_MEMBERS_REQUEST',
    };
    const expected = Object.assign({}, quizMembersState, { isFetchingQuizMembers: true });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('GET_QUIZ_MEMBERS_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(quizMembersState);

    const action = {
        type: 'GET_QUIZ_MEMBERS_SUCCESS',
        data: getQuizMembers
    };
    const expected = Object.assign({}, quizMembersState, {
        isFetchingQuizMembers: false,
        members: getQuizMembers,
    });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('GET_QUIZ_MEMBERS_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(quizMembersState);

    const action = {
        type: 'GET_QUIZ_MEMBERS_FAILURE',
        error: getQuizMembersError
    };
    const expected = Object.assign({}, quizMembersState, { error: getQuizMembersError, isFetchingQuizMembers: false });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

//
// EDIT SCORE Reducers
//
test('EDIT_SCORE_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(quizMembersState);

    const action = {
        type: 'EDIT_SCORE_REQUEST',
    };
    const expected = Object.assign({}, quizMembersState, { isEditingScore: true });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('EDIT_SCORE_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(quizMembersState);

    const action = {
        type: 'EDIT_SCORE_SUCCESS'
    };
    const expected = Object.assign({}, quizMembersState, {
        isEditingScore: false
    });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('EDIT_SCORE_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(quizMembersState);

    const action = {
        type: 'EDIT_SCORE_FAILURE',
        error: editScoreError
    };
    const expected = Object.assign({}, quizMembersState, { error: editScoreError, isEditingScore: false });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});


test('UPDATE_SCORE works', (t) => {

    t.plan(1);

    const initialState = Object.assign({}, quizMembersState, { members: [{ user_id: 1, username: 'student', email: 'student@city.ac.uk', score: 1 }] });

    const action = {
        type: 'UPDATE_SCORE',
        score: 5,
        member_key: 0
    };
    const expected = Object.assign({}, quizMembersState, { members: [{ user_id: 1, username: 'student', email: 'student@city.ac.uk', score: 5 }] });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});
