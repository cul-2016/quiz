import test from 'tape';
import { quizMembers as quizMembersState } from '../../utils/reducer-fixtures';
import { getQuizMembersError } from '../../utils/action-fixtures';
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
