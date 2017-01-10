import test from 'tape';
import * as actions from '../../../../src/js/actions/live-quiz';
import createThunk from '../../../utils/mockThunk';
import deepFreeze from '../../../utils/deepFreeze';
import { endQuizError as error } from '../../../utils/action-fixtures';


test('endQuiz async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();
    dispatch(actions.endQuiz());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.END_QUIZ_REQUEST
    };
    t.deepEqual(actual, expected);
});


test('endQuizRequest creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.END_QUIZ_REQUEST
    };

    const actual = deepFreeze(actions.endQuizRequest());
    t.deepEqual(actual, expected);
});

test('endQuizSuccess creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.END_QUIZ_SUCCESS
    };

    const actual = deepFreeze(actions.endQuizSuccess());
    t.deepEqual(actual, expected);
});

test('endQuizFailure creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.END_QUIZ_FAILURE,
        error
    };

    const actual = deepFreeze(actions.endQuizFailure(error));
    t.deepEqual(actual, expected);
});
