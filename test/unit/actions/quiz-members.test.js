import test from 'tape';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/quiz-members';
import { getQuizMembersError, editScoreError } from '../../utils/action-fixtures';
import deepFreeze from '../../utils/deepFreeze';
import { getQuizMembers } from '../../utils/data-fixtures';


//
// GET QUIZ MEMBERS ACTIONS
//
test('getQuizMembers async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();

    dispatch(actions.getQuizMembers());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.GET_QUIZ_MEMBERS_REQUEST
    };
    t.deepEqual(actual, expected);
});

test('getQuizMembersRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_MEMBERS_REQUEST
    }

    const actual = deepFreeze(actions.getQuizMembersRequest());
    t.deepEqual(actual, expected);
});

test('getQuizMembersSuccess creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.GET_QUIZ_MEMBERS_SUCCESS,
        data: getQuizMembers
    }

    const actual = deepFreeze(actions.getQuizMembersSuccess(getQuizMembers));
    t.deepEqual(actual, expected);
});

test('getQuizMembersFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_MEMBERS_FAILURE,
        error: getQuizMembersError
    };

    const actual = deepFreeze(actions.getQuizMembersFailure(getQuizMembersError));
    t.deepEqual(actual, expected);
});

//
// EDIT SCORE ACTIONS
//
test('editScore async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();

    dispatch(actions.editScore());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.EDIT_SCORE_REQUEST
    };
    t.deepEqual(actual, expected);
});

test('editScoreRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.EDIT_SCORE_REQUEST
    }

    const actual = deepFreeze(actions.editScoreRequest());
    t.deepEqual(actual, expected);
});

test('editScoreSuccess creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.EDIT_SCORE_SUCCESS
    }

    const actual = deepFreeze(actions.editScoreSuccess());
    t.deepEqual(actual, expected);
});

test('editScoreFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.EDIT_SCORE_FAILURE,
        error: editScoreError
    };

    const actual = deepFreeze(actions.editScoreFailure(editScoreError));
    t.deepEqual(actual, expected);
});

test('scoreChange creates the correct action', (t) => {

    t.plan(1);
    const score = 10;
    const member_key = 0
    const expected = {
        type: actions.SCORE_CHANGE,
        score,
        member_key
    };

    const actual = deepFreeze(actions.scoreChange(score, member_key));
    t.deepEqual(actual, expected);
});
