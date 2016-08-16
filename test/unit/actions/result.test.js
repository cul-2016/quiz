import test from 'tape';
import * as actions from '../../../src/js/actions/result';
import createThunk from '../../utils/mockThunk';
import deepFreeze from '../../utils/deepFreeze';
import { getQuizResultError as error } from '../../utils/action-fixtures';


test('getQuizResult async action creator returns expected action', (t) => {

    t.plan(1);

    let result;
    const { dispatch, queue } = createThunk();
    dispatch(actions.getQuizResult());

    [{ ...result }] = queue;

    const expected = {
        type: actions.GET_QUIZ_RESULT_REQUEST
    };
    t.deepEqual(result, expected);
});

test('getQuizResultRequest creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_RESULT_REQUEST
    };

    const actual = deepFreeze(actions.getQuizResultRequest());
    t.deepEqual(actual, expected);
});

test('getQuizResultSuccess creates the correct action', (t) => {
    t.plan(1);

    const data = { score: '2' };

    const expected = {
        type: actions.GET_QUIZ_RESULT_SUCCESS,
        data
    };

    const actual = deepFreeze(actions.getQuizResultSuccess(data));
    t.deepEqual(actual, expected);
});

test('getQuizResultFailure creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_RESULT_FAILURE,
        error
    };

    const actual = deepFreeze(actions.getQuizResultFailure(error));
    t.deepEqual(actual, expected);
});
