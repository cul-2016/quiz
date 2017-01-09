import test from 'tape';
import * as actions from '../../../../src/js/actions/live-quiz';
import createThunk from '../../../utils/mockThunk';
import deepFreeze from '../../../utils/deepFreeze';
import { abortQuizError as error } from '../../../utils/action-fixtures';


test('abortQuiz async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();
    dispatch(actions.abortQuiz());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.ABORT_QUIZ_REQUEST
    };
    t.deepEqual(actual, expected);
});


test('abortQuizRequest creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.ABORT_QUIZ_REQUEST
    };

    const actual = deepFreeze(actions.abortQuizRequest());
    t.deepEqual(actual, expected);
});

test('abortQuizSuccess creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.ABORT_QUIZ_SUCCESS
    };

    const actual = deepFreeze(actions.abortQuizSuccess());
    t.deepEqual(actual, expected);
});

test('abortQuizFailure creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.ABORT_QUIZ_FAILURE,
        error
    };

    const actual = deepFreeze(actions.abortQuizFailure(error));
    t.deepEqual(actual, expected);
});
