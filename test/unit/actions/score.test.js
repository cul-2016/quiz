import test from 'tape';
import * as actions from '../../../src/js/actions/score';
import createThunk from '../../utils/mockThunk';
import deepFreeze from '../../utils/deepFreeze';
import { getQuizScoreError as error } from '../../utils/action-fixtures';


test('getQuizScore async action creator returns expected action', (t) => {

    t.plan(1);

    let result;
    const { dispatch, queue } = createThunk();
    dispatch(actions.getQuizScore());

    [{ ...result }] = queue;

    const expected = {
        type: actions.GET_QUIZ_SCORE_REQUEST
    };
    t.deepEqual(result, expected);
});

test('getQuizScoreRequest creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_SCORE_REQUEST
    };

    const actual = deepFreeze(actions.getQuizScoreRequest());
    t.deepEqual(actual, expected);
});

test('getQuizScoreSuccess creates the correct action', (t) => {
    t.plan(1);

    const score = 3;

    const expected = {
        type: actions.GET_QUIZ_SCORE_SUCCESS,
        score
    };

    const actual = deepFreeze(actions.getQuizScoreSuccess(score));
    t.deepEqual(actual, expected);
});

test('getQuizScoreFailure creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_SCORE_FAILURE,
        error
    };

    const actual = deepFreeze(actions.getQuizScoreFailure(error));
    t.deepEqual(actual, expected);
});
