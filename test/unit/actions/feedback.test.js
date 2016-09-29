import test from 'tape';
import * as actions from '../../../src/js/actions/feedback';
import deepFreeze from '../../utils/deepFreeze';
import createThunk from '../../utils/mockThunk';
import { getFeedbackError } from '../../utils/action-fixtures';
import { feedback as data } from '../../utils/data-fixtures';

test('getFeedback async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();

    dispatch(actions.getFeedback());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.GET_FEEDBACK_REQUEST
    };
    t.deepEqual(actual, expected);
});

test('getFeedbackRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_FEEDBACK_REQUEST
    };

    const actual = deepFreeze(actions.getFeedbackRequest());
    t.deepEqual(actual, expected);
});

test('getFeedbackSuccess creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.GET_FEEDBACK_SUCCESS,
        data
    };

    const actual = deepFreeze(actions.getFeedbackSuccess(data));
    t.deepEqual(actual, expected);
});

test('getFeedbackFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_FEEDBACK_FAILURE,
        error: getFeedbackError
    };

    const actual = deepFreeze(actions.getFeedbackFailure(getFeedbackError));
    t.deepEqual(actual, expected);
});
